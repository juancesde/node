const { Router} = require("express");
const router = Router();
const apiRoute = '/api';
const studentsController= require('../controllers/students_controller')
const courseController = require('../controllers/course_controller')

//course
router.get(apiRoute+'/course',courseController.getAll)
router.get(apiRoute+'/course/:id',courseController.getById)
router.post(apiRoute+'/course',courseController.create)
router.put(apiRoute+'/course/:id',courseController.update)
router.delete(apiRoute+'/course/:id',courseController.delete)

//students
router.get(apiRoute+'/students',studentsController.getAll)

module.exports = router;