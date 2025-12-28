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
    

# =========================
# ROOM MASTER
# =========================
class Room(models.Model):
    ROOM_TYPE_CHOICES = (
        ("CLASSROOM", "Classroom"),
        ("LAB", "Lab"),
        ("TUTORIAL", "Tutorial Room"),
        ("SEMINAR", "Seminar Hall"),
        ("COMMON", "Common Room"),
        ("AUDITORIUM", "Auditorium"),
    )

    room_code = models.CharField(max_length=30, unique=True)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    floor = models.IntegerField(null=True, blank=True)
    capacity = models.IntegerField()
    image = models.ImageField(upload_to="rooms/", null=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.room_code


# =========================
# TIME SLOT
# =========================
class TimeSlot(models.Model):
    DAY_CHOICES = (
        ("MON", "Monday"),
        ("TUE", "Tuesday"),
        ("WED", "Wednesday"),
        ("THU", "Thursday"),
        ("FRI", "Friday"),
        ("SAT", "Saturday"),
    )

    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.day} {self.start_time}-{self.end_time}"

    class Meta:
        unique_together = ("day", "start_time", "end_time")


# =========================
# TIMETABLE (ADMIN PRIORITY)
# =========================
class Timetable(models.Model):
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    timeslot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)

    is_cancelled = models.BooleanField(default=False)
    cancelled_by_teacher = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.class_obj} | {self.subject} | {self.room}"


# =========================
# ROOM BOOKING REQUEST
# =========================
class RoomBookingRequest(models.Model):
    student = models.ForeignKey(
        Student,
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    teacher = models.ForeignKey(
        Teacher,
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )

    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    timeslot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    purpose = models.CharField(max_length=200)

    status = models.CharField(
        max_length=20,
        choices=(
            ("PENDING", "Pending"),
            ("APPROVED", "Approved"),
            ("REJECTED", "Rejected"),
        ),
        default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.room} | {self.timeslot} | {self.status}"