const express = require("express");
const bodyParser = require("body-parser");
const appInit = () => {
    //funcion appInit guardo la configuracion express, cors y body parser
    const app = express();
    //configuracion CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        // authorized headers for preflight requests
        // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
        app.options("*", (req, res) => {
            // allowed XHR methods
            res.header(
                "Access-Control-Allow-Methods",
                "GET, PATCH, PUT, POST, DELETE, OPTIONS"
            );
            res.send();
        });
    });

    // CONFIGURACIÓN: traducimos el json , configuración body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    return app;
};

module.exports = {
    // exporta la funcion appInit para ser usado en SERVER
    appInit: appInit,
};