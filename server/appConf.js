const express = require("express");
const bodyParser = require("body-parser");
const appInit = () => {
    const app = express();

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return next();
    });

    // CONFIGURACIÓN: traducimos el json , configuración body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('public'));

    return app;
};

module.exports = {
    // exporta la funcion appInit para ser usado en SERVER
    appInit: appInit,
};
