const mongoose = require("mongoose"); // libreria que permite hacer conecciones a bdatos de MONGO DB y conecciones
const mongoUrl =
    process.env["MONGO_DB_URL"] || "mongodb://localhostxxx/BBDDproy";

const bdInit = () => {
    console.log(
        `[MONGOOSE]: Contectango con base de datos MongoDB con la URL: ${mongoUrl}...`
    );

    // Debug de las operciones
    mongoose.set("debug", (collectionName, method, query, options, doc) => {
        console.log(
            "[MONGOOSE]: " +
            collectionName +
            "." +
            method +
            "(" +
            JSON.stringify(query) +
            ") " +
            JSON.stringify(options)
        );
    });

    // Realizo la conexion con la BBDD
    return mongoose
        .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((db) => {
            console.log("[MONGOOSE]: Base de Datos MongoDB conectada");
            return db;
        })
        .catch((err) =>
            console.error("[MONGOOSE]: Error al conectar con la Base de Datos", err)
        );
};

module.exports = {
    // exporta la funcion bdInit para ser usado en SERVER
    bdInit: bdInit,
};