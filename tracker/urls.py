from django.urls import path
from .views import testrun,course_view

urlpatterns = [
    path('',course_view)
]