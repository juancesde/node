const pool = require('./dbconnection')
const course_repository = {}

course_repository.getAll = () => {
  const context =  pool()
  return context.query('select * from course')
}

course_repository.getById = (id) => {
  const context =  pool()
  return context.query('select * from course where id=$1',[id])
}

course_repository.create = (course) => {
  const context =  pool()
  return context.query('insert into course (description,teacher) values ($1,$2) RETURNING id',[course.Description,course.Teacher])
}

course_repository.update = (course) => {
  const context =  pool()
  return context.query('update course SET description = $2,teacher=$3 where id=$1',[course.Id,course.Description,course.Teacher])
}

course_repository.delete = (id) => {
  const context =  pool()
  return context.query('delete from course where id=$1',[id])
}
module.exports = course_repository;