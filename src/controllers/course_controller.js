const courseController = {};
const Course = require('../models/course');
const course_repository = require('../repositories/course_repository')


courseController.getAll = (req, res) => {
    //logica para listar todos los cursos
    course_repository.getAll()
        .then((courses) => {
            //si devuelve mas de un registro
            if (courses.rows.length == 0) {
                res.status(400).send('Not Found');
            }
            res.json(courses.rows);
        })
        .catch((error) => {
            res.status(500).send(error.stack);
        })
}

courseController.getById = (req, res) => {
    const id = req.params['id']
    course_repository.getById(id)
        .then((courses) => {
            if (courses.rows.length == 0) {
                res.status(400).send({});
            }
            res.json(courses.rows);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

courseController.create = (req, res) => {
    //capturar body request
    const newCourse = req.body;
    //crear modelo tipo course
    let course = new Course(null,newCourse.description,newCourse.teacher)
    //llamar metodo del repository y enviamos objeto modelo
    course_repository.create(course)
        .then((resp) => {
            if (resp.rows.length == 0) {
                res.status(400).send({});
            }
            //si inserto correctamente
            course.Id = resp.rows[0].id
            res.status(201).send(course);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
courseController.update = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    //capturamos body request
    const newCourse = req.body;
    //crear modelo tipo course
    let course = new Course(id,newCourse.description,newCourse.teacher)
    course_repository.update(course)
        .then((resp) => {
            //si actualizo correctamente
            res.status(200).send(course);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
courseController.delete = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    course_repository.delete(id)
        .then((resp) => {
            //si elimino correctamente
            res.status(200);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

module.exports = courseController
