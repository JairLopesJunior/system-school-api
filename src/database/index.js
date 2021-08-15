const Sequelize = require('sequelize'); // Importando o Sequelize
const dbConfig = require('../config/database'); // Importando as configurações da nossa Base de Dados

const connection = new Sequelize(dbConfig); // Cria a conexão com a Base de Dados

const Course = require('../app/models/course');
const Student = require('../app/models/student');

Course.init(connection);
Student.init(connection);

Course.associate(connection.models);
Student.associate(connection.models);

module.exports = connection; // Exporta a conexão com a base de dados