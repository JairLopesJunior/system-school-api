const { Course } = require('../../app/models');


module.exports = {
    async getAll(req, res) {
        await Course.findAll()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ error: `Falha ao carregar cursos, erro: ${error}` }));
    },

    async add(req, res){
        const { course_id, description, menu } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Descrição é um campo obrigatório.' });
        }
        if (!menu) {
            return res.status(400).json({ error: 'Ementa é um campo obrigatório.' });
        }

        await Course.create({ description, menu });
        return res.status(201).json({ error: 'Curso criado com sucesso.' });
    },

    async update(req, res){
        const { id, description, menu } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Descrição é um campo obrigatório.' });
        }

        if (!menu) {
            return res.status(400).json({ error: 'Ementa é um campo obrigatório.' });
        }
    
        let courseFound = await Course.findByPk(id);
    
        if(!courseFound){
            return res.status(404).json({ error: 'Curso inexistente.' });
        }

        courseFound.update({ description, menu });
        return res.status(200).json( { success: 'Curso atualizado com sucesso.' } );
    },

    async delete(req, res) {
        const { course_id } = req.params;

        const courseFound = await Course.findByPk(course_id);

        if(!courseFound) {
            return res.status(404).json({error: 'Curso não encontrado.'});
        }

        courseFound.destroy();
        await res.status(200).json({error: 'Curso deletado com sucesso.'});
    },

    async findById(req, res) {
        const { course_id } = req.params;

        const courseFound = await Course.findByPk(course_id);

        if(!courseFound) {
            return res.status(404).json({error: 'Curso não encontrado.'});
        }

        await res.status(200).json(courseFound);
    },
};
