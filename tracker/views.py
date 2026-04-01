from django.shortcuts import render
from django.http import JsonResponse
from .models import Courses, Modules, Enrollments, Users
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, login, authenticate
import json

# Create your views here.
User = get_user_model()

def testrun (request):
    print("Request Objest:",request)
    data = {"Name": "Hello World"}
    return JsonResponse(data)


#To create a new user
@csrf_exempt
def signup(request):

    if request.method == 'POST':
        data = request.body.decode()
        data = json.loads(data)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        #Check if username already taken
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                "error" : "Username already exist"
            },status = 400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({
                "error" : "Email already used in another account"
            },status = 400)

        #create a new user
        user = Users.objects.create_user(username = username, email = email, password = password)

        user.save()
        return JsonResponse({
            "message" : "User Successfully created",
            "user_id" : user.id
        })



#To login
@csrf_exempt
def login_view(request):
    data = request.body.decode()
    data = json.loads(data)

    user = authenticate(
        username = data.get("username"),
        password = data.get("password")
    )

    # if such user exists and credentials match
    if user:
        login(request, user)
        return JsonResponse({"message" : "Logged In"})

    #Wrong credentials
    else:
        return JsonResponse({"message" : "Invalid credentials"}, status = 400)





#List of courses available publicly (public is not yet introduced)
@csrf_exempt
def courses(request):

    #Get the list of all publicly available course (already posted in out website and wanted it to been publicly)
    if request.method == 'GET':
        courses = Courses.objects.all()
        response = []
        for course in courses:
            response.append(
                {
                    "id" : course.id,
                    "title" : course.title,
                    "instructor" : course.instructor,
                    "No of Modules" : course.no_modules
                }
            )
        return JsonResponse(response, safe = False)

    #Create a new public course by the user for other users to see
    elif request.method == 'POST':
        data = request.body.decode()
        data = json.loads(data)

        user = request.user

        # Details about the course
        title = data.get("title")
        instructor = data.get("instructor")
        no_modules = data.get("no_of_modules")
        url = data.get("url")

        # check if the course already exist, uploaded by any other user (or themselves) using url
        course = Courses.objects.filter(url=url)

        # The course does not already exist so we add this course to Courses DB and enroll 
        if not course:
            #Create course
            course = Courses(
                title = title,
                instructor = instructor,
                no_modules = no_modules,
                url = url
            )
            course.save()

            #Enroll the user automatically to this course
            enrollment = Enrollments(
                user=user,
                course = course,
            )
            enrollment.save()

            return JsonResponse({
                "message" : "Course created and Enrolled in",
                "course_id" : course.id,
                "user_id" : user.id
            })


        # If course already exist  
        else:
            return JsonResponse({
                "message" : "Course already exist"
            }, status = 400)

        return JsonResponse({"status": f"Course created {new_course.id}"})



# Giving details About a specific Course from The list of Courses publicly available (User clicks a course from the public list of courses)
@csrf_exempt
def course_details(request,id):

    #Find the specific course
    course = Courses.objects.get(id = id)

    if request.method == 'GET':

        #Find the Modules of the course
        modules = Module.object.filter(course=course)
        modules_data = []

        # details of each modules in the course
        for module in modules:
            modules_data.append({
                "id": module.id,
                "Module title" : module.module_title,
                "completed" : module.is_completed
            })

        #get user to check if the user has already enrolled or not 
        user = request.user

        #check if already enrolled or not
        enrollement = Enrollements.objects.filter(user=user, course=course)

        #Progress if already enrolled 
        progress = enrollement.progress_percentage if enrollement else 0

        #status of the course if enrolled by the user
        status = enrollement.status if enrollement else "not_yet_enrolled"

        response = {
            "course_id": course.id,
            "title": course.title,
            "instructor": course.instructor,
            "description": course.description,
            "modules" : modules_data,
            "progress" : progress,
            "status" : status
        } 

        return JsonResponse(response, safe= False)



#to get the lsi of all the courses enrolled by the user - Main page
@csrf_exempt
def enrollments(request):

    if request.method == 'GET':

        #get the user to check enrollments table
        user = request.user

        #list of all the enrollments the user has done (adhaathu courses)
        enrollements = Enrollements.objects.filter(user=user)

        response = []

        for enrollment in enrollments:
            response.append({
                "enrollment_id" : enrollement.id,
                "course_id" : enrollement.course.id,
                "course_title" : enrollement.course.title,
                "status" : enrollement.status,
                "enrolled_date" : enrollement.enroll_date
            })

        return JsonResponse(response,safe = False)

    # User to enroll in a new course either available publicly or their own
    if request.method == 'POST':
        data = request.body.decode()
        data = json.loads(data)

        user = request.user
        course_id = data.get("course_id")

        course = Courses.objects.get(id=course_id)

        if Enrollments.objects.filter(user=user, course=course).exists():
            return JsonResponse(
                {"error": "Already Enrolled"},
                status = 400
            )

        enrollement = Enrollments(user=user, course=course)
        enrollement.save()
        return JsonResponse({
            "message" : "Enrolled successfully",
            "enrollment_id" : enrollement.id,
            "user_id" : user.id,
            "course_id" : course.id,
            "course_title" : course.title
        }, safe = False)



'''
@csrf_exempt
def modules(request):
    if request.method == 'GET':
        modules = Modules.objects.all()
        response = []
        for module in modules:
            response.append(
                {
                    "id" : module.id,
                    "title" : module.module_title,
                    "course" : module.course.id,
                    "Completed" : module.is_completed,
                }
            )
        return JsonResponse(response, safe = False)

    elif request.method == 'POST':
        data = request.body
        data = data.decode()
        data = json.loads(data)
        course = Courses.objects.get(id=data.get("course"))
        new_module = Modules(module_title=data.get("title", ""),
                            course = course,
                            is_completed=data.get("completed",False))
        new_module.save()
        return JsonResponse({"status": f"Module created {new_module.id}"})
'''