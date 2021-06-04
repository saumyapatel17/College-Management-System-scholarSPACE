const express = require("express");
const controllers = require("../src/controllers");
const admin = require("../src/admin");
const teacher = require('../src/teacher');
const student = require('../src/student');
const router = express.Router();

router.post('/get_started', controllers.get_started)

router.post('/login', controllers.login)

router.post('/signUp', controllers.signUp)

router.post('/contact', controllers.contact)

router.post('/admin_announcement', admin.admin_announcement)

router.post('/admin_events', admin.admin_events)

router.post('/admin_event_id', admin.admin_event_id)

router.post('/admin_event_posterUpload', admin.admin_event_posterUpload)

router.post('/admin_event_register', admin.admin_event_register)

router.post('/admin_updateStudent', admin.admin_updateStudent)

router.post('/admin_removeStudent', admin.admin_removeStudent)

router.post('/admin_updateTeacher', admin.admin_updateTeacher)

router.post('/admin_removeTeacher', admin.admin_removeTeacher)

router.post('/admin_addCourse', admin.admin_addCourse)

router.post('/admin_updateCourse', admin.admin_updateCourse)

router.post('/admin_removeCourse', admin.admin_removeCourse)

router.post('/admin_subscription', admin.admin_subscription)

router.post('/admin_updateInstInfo', admin.admin_updateInstInfo)

router.post('/admin_updatePersonalInfo', admin.admin_updatePersonalInfo)

router.post('/teacher_announcement', teacher.teacher_announcement)

router.post('/teacher_events', teacher.teacher_events)

router.post('/teacher_event_id', teacher.teacher_event_id)

router.post('/teacher_event_posterUpload', teacher.teacher_event_posterUpload)

router.post('/teacher_event_register', teacher.teacher_event_register)

router.post('/teacher_groups', teacher.teacher_groups)

router.post('/teacher_group_id', teacher.teacher_group_id)

router.post('/teacher_addTeacher', teacher.teacher_addTeacher)

router.post('/teacher_removeTeacher', teacher.teacher_removeTeacher)

router.post('/teacher_addStudent', teacher.teacher_addStudent)

router.post('/teacher_removeStudent', teacher.teacher_removeStudent)

router.post('/teacher_projects', teacher.teacher_projects)

router.post('/teacher_project_id', teacher.teacher_project_id)

router.post('/teacher_project_grade', teacher.teacher_project_grade)

router.post('/teacher_updatePersonalInfo', teacher.teacher_updatePersonalInfo)

router.post('/student_event_id', student.student_event_id)

router.post('/student_event_register', student.student_event_register)

router.post('/student_group_id', student.student_group_id)

router.post('/student_submit_project', student.student_submit_project)

router.post('/student_project_id', student.student_project_id)

router.post('/student_addMember', student.student_addMember)

router.post('/student_removeMember', student.student_removeMember)

router.post('/student_updatePersonalInfo', student.student_updatePersonalInfo)

module.exports = router;