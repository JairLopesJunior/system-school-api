const { Registration } = require('../../app/models');


module.exports = {

    //   async add(req, res){
    //     const { course_id, student_id } = req.body;

    //     let courseFound = await Registration.findByPk(id);

    //     if(!courseFound){
    //         await Course.create({ description, menu });
    //         return res.status(201).json({ description, menu });
    //     }

    //     courseFound.update({ description, menu });
    //     return res.status(200).json(courseFound);
    // },

    async delete(req, res) {
        const { id } = req.params;

        const registrationFound = await Registration.find(student_id);

        if(!registrationFound) {
            return res.status(400).json({error: 'Matricula não encontrado.'});
        }

        registrationFound.destroy();
        return res.status(200).json();
    }
};