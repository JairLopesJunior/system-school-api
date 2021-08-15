const { Student } = require('../../app/models');

module.exports = {
    async getAll(req, res) {
        await Student.findAll()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ error: `Falha ao carregar os estudantes, erro: ${error}` }));
    },

    async add(req, res){
        const { id, name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Nome é um campo obrigatório' });
        }

        let nameFound = await Student.findByPk(id);

        if(!nameFound){
            await Student.create({ name });
            return res.status(201).json({ name });
        }

        nameFound.update({ name });
        return res.status(200).json( nameFound );
    },

    async delete(req, res) {
        const { student_id } = req.params;

        const studentFound = await Student.findByPk(student_id);

        if(!studentFound) {
            return res.status(400).json({error: 'Estudante não encontrado.'});
        }

        studentFound.destroy();
        await res.status(200).json();
    },
    
};