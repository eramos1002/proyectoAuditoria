const mongoose = require("mongoose"); // libreria que permite hacer conecciones a bdatos de MONGO DB y conecciones

const bdInit = () => {
    //Realizo la conexion con la BBDD
    const bd = mongoose.connect(
        "mongodb://localhost/BBDDproy", { useNewUrlParser: true, useUnifiedTopology: true },
        (err, res) => {
            //conecto a una BD , para evitar los warning al conectar poner los useNew.. useUni
            if (err) console.error(err, "Error al conectar con la Base de Datos");
            else console.log("Base de Datos MongoDB conectada");
        }
    );
    return bd;
};

module.exports = {
    // exporta la funcion bdInit para ser usado en SERVER
    bdInit: bdInit,
};