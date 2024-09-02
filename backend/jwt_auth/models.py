from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True, null=False)
    photo = models.ImageField(upload_to='users', null=True, default='users/default.png')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects: models.Manager
