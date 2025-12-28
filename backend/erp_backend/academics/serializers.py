from rest_framework import serializers
from .models import Class
from .models import ClassStudent
from .models import Subject, TeachingAssignment
from .models import Room
from .models import TimeSlot
from .models import Timetable
from .models import Class, Subject
from rest_framework import serializers

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = "__all__"

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"

class ClassStudentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.name", read_only=True)
    student_email = serializers.CharField(source="student.email", read_only=True)
    student_course = serializers.CharField(source="student.course", read_only=True)
    student_semester = serializers.IntegerField(source="student.semester", read_only=True)

    class Meta:
        model = ClassStudent
        fields = [
            "id",
            "student",
            "student_name",
            "student_email",
            "student_course",
            "student_semester",
        ]
        
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "name", "course", "semester"]


class TeachingAssignmentSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)

    class Meta:
        model = TeachingAssignment
        fields = ["id", "subject", "subject_name", "teacher", "teacher_name"]
