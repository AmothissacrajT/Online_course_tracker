from django.shortcuts import render
from django.http import JsonResponse
from .models import Courses
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def testrun (request):
    print("Request Objest:",request)
    data = {"Name": "Hello World"}
    return JsonResponse(data)

@csrf_exempt
def course_view(request):
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

    elif request.method == 'POST':
        data = request.body
        data = data.decode()
        data = json.loads(data)
        new_course = Courses(title=data.get("title", ""),
                            instructor=data.get("instructor",""),
                            no_modules = data.get("No of Modules",""))
        new_course.save()
        return JsonResponse({"status": f"Course created {new_course.id}"})