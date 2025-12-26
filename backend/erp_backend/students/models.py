from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True)   # academic identity
    email = models.EmailField(unique=True)                   # login identity
    semester = models.CharField(max_length=10)

    password = models.CharField(max_length=100, default="sies@123")

    def __str__(self):
        return self.email
