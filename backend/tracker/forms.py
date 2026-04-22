# forms.py
from django.contrib.auth.forms import UserCreationForm
from .models import Users   # your custom model

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Users
        fields = ("username", "password1", "password2")