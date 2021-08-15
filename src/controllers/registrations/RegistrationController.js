const { CourseStudent, Course, Student } = require('../../app/models');


module.exports = {

      async add(req, res){
        const { id, code_course, code_student } = req.body;

        let courseStudentFound = await CourseStudent.findByPk(id);

        if(courseStudentFound) {
            return res.status(200).json({error: 'Matricula já existente.'});
        }

        let courseFound = await Course.findByPk(code_course);

        if(!courseFound){
            return res.status(404).json({error: 'Curso não encontrado.'});
        }

        let studentFound = await Student.findByPk(code_student);

        if(!studentFound){
            return res.status(404).json({error: 'Estudante não encontrado.'});
        }

        CourseStudent.create({ code_course, code_student });
        return res.status(201).json({success: 'Matricula criada com sucesso.'});
    },

    async delete(req, res) {
        const { id } = req.params;

        const registrationFound = await Registration.find(id);

        if(!registrationFound) {
            return res.status(404).json({error: 'Matricula não encontrada.'});
        }

        registrationFound.destroy();
        return res.status(200).json();
    }
};