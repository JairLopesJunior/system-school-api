const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

class App {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        dotenv.config();
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(('/'), require('./routes'));
    }
}

module.exports = new App().app