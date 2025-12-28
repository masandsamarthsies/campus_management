from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClassSerializer
from .models import ClassStudent, Class
from .serializers import ClassStudentSerializer
from students.models import Student
from .models import Subject, TeachingAssignment, Class
from .serializers import SubjectSerializer, TeachingAssignmentSerializer
from teachers.models import Teacher  # adjust app name if needed
from .models import Room
from .serializers import RoomSerializer
from .models import TimeSlot
from .serializers import TimeSlotSerializer
from .models import Timetable
from .serializers import TimetableSerializer
from .models import Class, Subject
from .serializers import ClassSerializer, SubjectSerializer
@api_view(["POST"])
def create_timetable_with_slot(request):
    data = request.data

    # ---------- HARD VALIDATION ----------
    required_fields = [
        "class_obj", "subject", "teacher",
        "room", "day", "start_time", "end_time"
    ]

    for field in required_fields:
        if not data.get(field):
            return Response(
                {"error": f"{field} is required"},
                status=400
            )

    # ---------- CREATE / GET TIMESLOT ----------
    timeslot, _ = TimeSlot.objects.get_or_create(
        day=data["day"],
        start_time=data["start_time"],
        end_time=data["end_time"]
    )

    # ---------- LOGICAL CLASH CHECKS ----------
    if Timetable.objects.filter(
        class_obj_id=data["class_obj"],
        timeslot=timeslot,
        is_cancelled=False
    ).exists():
        return Response({"error": "Class already has lecture"}, status=400)

    if Timetable.objects.filter(
        teacher_id=data["teacher"],
        timeslot=timeslot,
        is_cancelled=False
    ).exists():
        return Response({"error": "Teacher already busy"}, status=400)

    if Timetable.objects.filter(
        room_id=data["room"],
        timeslot=timeslot,
        is_cancelled=False
    ).exists():
        return Response({"error": "Room already booked"}, status=400)

    # ---------- CREATE TIMETABLE ----------
    Timetable.objects.create(
        class_obj_id=int(data["class_obj"]),
        subject_id=int(data["subject"]),
        teacher_id=int(data["teacher"]),
        room_id=int(data["room"]),
        timeslot=timeslot
    )

    return Response(
        {"message": "Timetable created successfully"},
        status=status.HTTP_201_CREATED
    )

@api_view(["GET"])
def list_timetable(request):
    data = []
    for t in Timetable.objects.all():
        data.append({
            "id": t.id,
            "class": str(t.class_obj),
            "subject": str(t.subject),
            "teacher": str(t.teacher),
            "room": str(t.room),
            "timeslot": str(t.timeslot),
            "is_cancelled": t.is_cancelled
        })
    return Response(data)
@api_view(["GET"])
def list_timetable(request):
    data = []
    for t in Timetable.objects.all():
        data.append({
            "id": t.id,
            "class": str(t.class_obj),
            "subject": str(t.subject),
            "teacher": str(t.teacher),
            "room": str(t.room),
            "timeslot": str(t.timeslot),
            "is_cancelled": t.is_cancelled
        })
    return Response(data)
@api_view(["POST"])
def cancel_class(request, timetable_id):
    try:
        timetable = Timetable.objects.get(id=timetable_id)
        timetable.is_cancelled = True
        timetable.cancelled_by_teacher = True
        timetable.save()

        return Response({"message": "Class cancelled"})
    except Timetable.DoesNotExist:
        return Response({"error": "Not found"}, status=404)



@api_view(["GET"])
def list_classes(request):
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def list_subjects(request):
    subjects = Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)



@api_view(["POST"])
def create_timetable(request):
    """
    Admin assigns:
    Class + Subject + Teacher + Room + TimeSlot
    """
    serializer = TimetableSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Timetable entry created"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def list_timetable(request):
    entries = Timetable.objects.all()
    serializer = TimetableSerializer(entries, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def list_timeslots(request):
    slots = TimeSlot.objects.all().order_by("day", "start_time")
    serializer = TimeSlotSerializer(slots, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_timeslot(request):
    serializer = TimeSlotSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_timeslot(request, slot_id):
    try:
        slot = TimeSlot.objects.get(id=slot_id)
        slot.delete()
        return Response({"message": "TimeSlot deleted"})
    except TimeSlot.DoesNotExist:
        return Response({"error": "TimeSlot not found"}, status=404)
@api_view(["GET"])
def list_rooms(request):
    rooms = Room.objects.all()   # 👈 REMOVE FILTER TEMPORARILY
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)



# @api_view(["GET"])
# def list_rooms(request):
#     rooms = Room.objects.filter(is_active=True)
#     serializer = RoomSerializer(rooms, many=True)
#     return Response(serializer.data)


@api_view(["POST"])
def create_room(request):
    serializer = RoomSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_room(request, room_id):
    try:
        room = Room.objects.get(id=room_id)
        room.delete()
        return Response({"message": "Room deleted"})
    except Room.DoesNotExist:
        return Response({"error": "Room not found"}, status=404)


@api_view(["POST"])
def create_class(request):
    serializer = ClassSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Class created successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 1️⃣ LIST ALL CLASSES (ManageClasses page)
@api_view(["GET"])
def list_classes(request):
    classes = Class.objects.all().order_by("course", "semester", "division")
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# 2️⃣ GET SINGLE CLASS (for manage page header later)
@api_view(["GET"])
def get_class(request, class_id):
    try:
        cls = Class.objects.get(id=class_id)
        serializer = ClassSerializer(cls)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Class.DoesNotExist:
        return Response(
            {"error": "Class not found"},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(["GET"])
def list_class_students(request, class_id):
    enrollments = ClassStudent.objects.filter(class_obj_id=class_id)
    serializer = ClassStudentSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def list_available_students(request, class_id):
    try:
        cls = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=404)

    enrolled_ids = ClassStudent.objects.filter(
        class_obj=cls
    ).values_list("student_id", flat=True)

    students = Student.objects.filter(
        course=cls.course,
        semester=cls.semester
    ).exclude(id__in=enrolled_ids)

    data = [
        {
            "id": s.id,
            "name": s.name,
            "email": s.email
        }
        for s in students
    ]

    return Response(data, status=status.HTTP_200_OK)

@api_view(["POST"])
def add_student_to_class(request):
    class_id = request.data.get("class_id")
    student_id = request.data.get("student_id")

    if not class_id or not student_id:
        return Response({"error": "Missing data"}, status=400)

    try:
        cls = Class.objects.get(id=class_id)
        student = Student.objects.get(id=student_id)
    except (Class.DoesNotExist, Student.DoesNotExist):
        return Response({"error": "Invalid class or student"}, status=404)

    obj, created = ClassStudent.objects.get_or_create(
        class_obj=cls,
        student=student
    )

    if not created:
        return Response({"error": "Student already in class"}, status=400)

    return Response({"message": "Student added successfully"}, status=201)

@api_view(["DELETE"])
def remove_student_from_class(request, enrollment_id):
    try:
        enrollment = ClassStudent.objects.get(id=enrollment_id)
        enrollment.delete()
        return Response({"message": "Student removed"})
    except ClassStudent.DoesNotExist:
        return Response({"error": "Record not found"}, status=404)
@api_view(["GET"])
def list_subjects_for_class(request, class_id):
    try:
        cls = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=404)

    subjects = Subject.objects.filter(
        course=cls.course,
        semester=cls.semester
    )

    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data, status=200)
@api_view(["GET"])
def list_teachers(request):
    teachers = Teacher.objects.all()
    data = [{"id": t.id, "name": t.name, "email": t.email} for t in teachers]
    return Response(data, status=200)
@api_view(["GET"])
def list_teaching_assignments(request, class_id):
    assignments = TeachingAssignment.objects.filter(class_obj_id=class_id)
    serializer = TeachingAssignmentSerializer(assignments, many=True)
    return Response(serializer.data, status=200)
@api_view(["POST"])
def assign_teacher(request):
    class_id = request.data.get("class_id")
    subject_id = request.data.get("subject_id")
    teacher_id = request.data.get("teacher_id")

    if not class_id or not subject_id or not teacher_id:
        return Response({"error": "Missing data"}, status=400)

    try:
        cls = Class.objects.get(id=class_id)
        subject = Subject.objects.get(id=subject_id)
        teacher = Teacher.objects.get(id=teacher_id)
    except (Class.DoesNotExist, Subject.DoesNotExist, Teacher.DoesNotExist):
        return Response({"error": "Invalid data"}, status=404)

    obj, _ = TeachingAssignment.objects.update_or_create(
        class_obj=cls,
        subject=subject,
        defaults={"teacher": teacher}
    )

    return Response({"message": "Teacher assigned successfully"}, status=200)

@api_view(["POST"])
def add_subject_and_assign_teacher(request):
    class_id = request.data.get("class_id")
    subject_name = request.data.get("subject_name")
    teacher_id = request.data.get("teacher_id")

    if not class_id or not subject_name or not teacher_id:
        return Response({"error": "Missing data"}, status=400)

    try:
        cls = Class.objects.get(id=class_id)
        teacher = Teacher.objects.get(id=teacher_id)
    except (Class.DoesNotExist, Teacher.DoesNotExist):
        return Response({"error": "Invalid data"}, status=404)

    # create subject for that course + semester
    subject = Subject.objects.create(
        name=subject_name,
        course=cls.course,
        semester=cls.semester
    )

    TeachingAssignment.objects.create(
        class_obj=cls,
        subject=subject,
        teacher=teacher
    )

    return Response({"message": "Subject added and teacher assigned"}, status=201)

