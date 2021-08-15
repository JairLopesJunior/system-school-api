const express = require('express');
const routes = express.Router();
const CourseController = require('./controllers/courses/CourseController');
const StudentController = require('./controllers/students/StudentController');
const RegistrationController = require('./controllers/registrations/RegistrationController');

routes.get('/courses', CourseController.getAll);
routes.post('/courses', CourseController.add);
routes.delete('/courses/:course_id', CourseController.delete);

routes.get('/students', StudentController.getAll);
routes.post('/students', StudentController.add);
routes.delete('/students/:student_id', StudentController.delete);

routes.post('/registrations', RegistrationController.add);
routes.delete('/registrations/:registration_id', RegistrationController.delete);

module.exports = routes;
