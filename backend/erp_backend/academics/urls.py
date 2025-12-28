from django.urls import path
from .views import create_class,get_class,list_classes,list_class_students,list_available_students,add_student_to_class,remove_student_from_class,list_subjects_for_class,list_teachers,list_teaching_assignments,assign_teacher
from .views import add_subject_and_assign_teacher
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

]
