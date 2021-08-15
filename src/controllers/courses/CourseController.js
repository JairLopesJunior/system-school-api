const { Course } = require('../../app/models');


module.exports = {
    async getAll(req, res) {
        await Course.findAll()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ error: `Falha ao carregar cursos, erro: ${error}` }));
    },

    async add(req, res){
        const { id, description, menu } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Descrição é um campo obrigatório' });
        }
        if (!menu) {
            return res.status(400).json({ error: 'Ementa é um campo obrigatório' });
        }

        let courseFound = await Course.findByPk(id);

        if(!courseFound){
            await Course.create({ description, menu });
            return res.status(201).json({ description, menu });
        }

        courseFound.update({ description, menu });
        return res.status(200).json(courseFound);
    },

    async delete(req, res) {
        const { course_id } = req.params;

        const courseFound = await Course.findByPk(course_id);

        if(!courseFound) {
            return res.status(400).json({error: 'Curso não encontrado.'});
        }

        courseFound.destroy();
        await res.status(200).json();
    },
};