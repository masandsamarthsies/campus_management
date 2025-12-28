from django.db import models
from students.models import Student
from teachers.models import Teacher  # adjust app name if needed

class Class(models.Model):
    COURSE_CHOICES = (
        ("MCA", "MCA"),
        ("MMS", "MMS"),
    )

    course = models.CharField(
        max_length=10,
        choices=COURSE_CHOICES
    )

    semester = models.IntegerField()
    division = models.CharField(max_length=5)
    academic_year = models.CharField(max_length=9)

    def __str__(self):
        return f"{self.course} Sem {self.semester} - {self.division} ({self.academic_year})"

    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Classes"
        unique_together = ("course", "semester", "division", "academic_year")

class ClassStudent(models.Model):
    class_obj = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("class_obj", "student")

    def __str__(self):
        return f"{self.student.name} → {self.class_obj}"

class Subject(models.Model):
    course = models.CharField(
        max_length=10,
        choices=(("MCA", "MCA"), ("MMS", "MMS"))
    )
    semester = models.IntegerField()
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.course} Sem {self.semester})"

class TeachingAssignment(models.Model):
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("class_obj", "subject")

    def __str__(self):
        return f"{self.subject} → {self.teacher}"
