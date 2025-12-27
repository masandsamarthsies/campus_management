from django.db import models
from django.conf import settings

# 1️⃣ Course
class Course(models.Model):
    name = models.CharField(max_length=20)  # MCA, BCA
    duration_years = models.IntegerField()

    def __str__(self):
        return self.name


# 2️⃣ Semester (MUST be before Subject)
class Semester(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    number = models.IntegerField()  # 1–6

    def __str__(self):
        return f"{self.course.name} Sem {self.number}"


# 3️⃣ Subject
class Subject(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    credits = models.IntegerField()

    def __str__(self):
        return self.name


# 4️⃣ Class / Division
class Class(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    division = models.CharField(max_length=5)  # A, B
    academic_year = models.CharField(max_length=9)  # 2024-25

    def __str__(self):
        return f"{self.semester} - {self.division}"


# 5️⃣ Student Enrollment
class Enrollment(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'STUDENT'}
    )
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE)


# 6️⃣ Teaching Assignment
class TeachingAssignment(models.Model):
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    faculty = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'TEACHER'}
    )

    class Meta:
        unique_together = ('class_obj', 'subject')
