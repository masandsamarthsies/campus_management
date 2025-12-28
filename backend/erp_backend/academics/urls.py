from django.urls import path
from .views import create_class,get_class,list_classes,list_class_students,list_available_students,add_student_to_class,remove_student_from_class,list_subjects_for_class,list_teachers,list_teaching_assignments,assign_teacher
from .views import add_subject_and_assign_teacher
from . import views
urlpatterns = [
    path("class/create/", create_class),
    path("classes/", list_classes),
    path("class/<int:class_id>/", get_class),
    path("class/<int:class_id>/students/", list_class_students),
path("class/<int:class_id>/available-students/", list_available_students),
path("class/student/add/", add_student_to_class),
path("class/student/remove/<int:enrollment_id>/", remove_student_from_class),
path("class/<int:class_id>/subjects/", list_subjects_for_class),
path("teachers/", list_teachers),
path("class/<int:class_id>/teaching-assignments/", list_teaching_assignments),
path("class/assign-teacher/", assign_teacher),
path("class/add-subject/",add_subject_and_assign_teacher),
path("rooms/", views.list_rooms),
    path("rooms/create/", views.create_room),
    path("rooms/delete/<int:room_id>/", views.delete_room),
    path("timeslots/", views.list_timeslots),
path("timeslots/create/", views.create_timeslot),
path("timeslots/delete/<int:slot_id>/", views.delete_timeslot),
path("timetable/create/", views.create_timetable),
path("timetable/", views.list_timetable),
path("classes/", views.list_classes),
path("subjects/", views.list_subjects),
path("timetable/create-inline/", views.create_timetable_with_slot),
path("timetable/", views.list_timetable),
path("timetable/cancel/<int:timetable_id>/", views.cancel_class),




]
