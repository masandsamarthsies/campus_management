from django.db import models

class Student(models.Model):
    COURSE_CHOICES = (
        ('MCA', 'MCA'),
        ('MMS', 'MMS'),
    )

    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True)   # academic identity
    email = models.EmailField(unique=True)                   # login identity

    # ✅ ADD THIS
    course = models.CharField(
        max_length=10,
        choices=COURSE_CHOICES
    )

    semester = models.IntegerField()  # 1,2,3,4 (optional but better than CharField)

    password = models.CharField(max_length=100, default="sies@123")

    def __str__(self):
        return f"{self.name} ({self.course})"
