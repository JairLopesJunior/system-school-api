const { Student, CourseStudent } = require('../../app/models');

module.exports = {
    async getAll(req, res) {
        await Student.findAll()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ error: `Falha ao carregar os estudantes, erro: ${error}` }));
    },

    async add(req, res){
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Nome é um campo obrigatório.' });
        }

        await Student.create({ name });
        return res.status(201).json({ error: 'Estudante criado com sucesso.' });
    },

    async update(req, res){
        const { id, name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Nome é um campo obrigatório.' });
        }

        let studentFound = await Student.findByPk(id);
    
        if(!studentFound){
            return res.status(404).json({ error: 'Estudante inexistente.' });
        }

        studentFound.update({ name });
        return res.status(200).json( { success: 'Estudante atualizado com sucesso.' } );
    },

    async delete(req, res) {
        const { student_id } = req.params;

        const studentFound = await Student.findByPk(student_id);

        if(!studentFound) {
            return res.status(404).json({error: 'Estudante não encontrado.'});
        }

	const cursoStudentFound = await CourseStudent.findOne({ where: { code_student: student_id } })

	if(!cursoStudentFound) {
	    studentFound.destroy();
            await res.status(200).json({error: 'Estudante deletado com sucesso.'});
        }

        return res.status(404).json({error: 'Estudante não pode ser removido.'});
    },

   async findById(req, res) {
        const { student_id } = req.params;

        const studentFound = await Student.findByPk(student_id);

        if(!studentFound) {
            return res.status(404).json({error: 'Estudante não encontrado.'});
        }

        await res.status(200).json(studentFound);
   },
    
};
