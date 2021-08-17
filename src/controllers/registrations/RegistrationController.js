const { CourseStudent, Course, Student } = require('../../app/models');


module.exports = {

      async add(req, res){
        const { code_course, code_student } = req.body;

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
        const { registration_id } = req.params;

	let studentFound = await Student.findByPk(registration_id);

	if(!studentFound){
	    return res.status(404).json({error: 'Estudante não matriculado.'});
	}

        const cursoStudentFound = await CourseStudent.findOne({ where: { code_student: registration_id } })

        if(!cursoStudentFound) {
            return res.status(404).json({error: 'Matricula não encontrada.'});
        }

        studentFound.destroy();
        return res.status(200).json();
    }
};
