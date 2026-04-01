from django.db import models

# Create your models here.
class Courses(models.Model):
    title = models.CharField(max_length=30)
    instructor = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
    no_modules = models.IntegerField()
    
    def __str__(self):
        return self.title