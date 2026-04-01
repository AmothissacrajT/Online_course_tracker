from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.login_view),
    path('signup/',views.signup),
    path('courses/',views.courses),
    path('courses/<int:id>/', views.course_details),
    path('enrollments/',views.enrollments),
]