from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.

class Users(AbstractUser):
    pass


class Courses(models.Model):
    title = models.CharField(max_length=30)
    instructor = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
    url = models.URLField(unique = True, default = "NA")
    no_modules = models.IntegerField(default = 0)
    
    def __str__(self):
        return self.title


class Modules(models.Model):
    course = models.ForeignKey(
        Courses,
        on_delete = models.CASCADE,
        related_name = 'module'
    )
    module_title = models.CharField(max_length=50)
    is_completed = models.BooleanField(default = False)

    def __str__(self):
        return f"{self.course.title} - {self.module_title}"



class Enrollments(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        related_name = 'enrollment'
    )
    course = models.ForeignKey(
        Courses,
        on_delete = models.CASCADE,
        related_name = 'enrollment'
    )
    enroll_date = models.DateField(auto_now_add = True)
    start_date = models.DateField(null = True)
    end_date = models.DateField(null = True)
    status = models.CharField( max_length = 15,
        default = 'not_started',
        choices = [
            ('not_started','Not Started'),
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
        ]
    )
    progress_percentage = models.FloatField(default = 0)

    def __str__(self):
        return f"{self.user}'s Enrollement {self.course}"



class StudySessions(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        related_name = 'session'
    )
    course = models.ForeignKey(
        Courses,
        on_delete = models.CASCADE,
        related_name = 'session'
    )

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration_min = models.IntegerField()

    def __str__(self):
        return f"{self.user}'s study session {self.course}"


class Streaks(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        related_name = 'streaks'
    )
    
    current_streak = models.IntegerField(default = 0)
    longest_streak = models.IntegerField(default = 0)
    last_activity_date = models.DateField(null = True)
    streak_start_date = models.DateField(null = True)

    def __str__(self):
        return f"{self.user}'s streak"



