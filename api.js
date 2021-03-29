const { appInit } = require("./appConf");
const { bdInit } = require("./bdConf");
const Audit = require("./models/audit");
const Building = require("./models/building");
const User = require("./models/user");

const api = appInit();
const bd = bdInit();

//ENDPOINTS AUDITS
api.get("/api/audits", (request, response) => {
    Audit.find((err, data) => {
        if (err) {
            console.error(err);
        } else {
            response.send(data);
        }
    });
});

api.get("/api/audits", (request, response) => {
    Audit.find((err, data) => {
        if (err) {
            console.error(err);
        } else {
            response.send(data);
        }
    });
});

//ENDPOINTS BUILDINGS
api.get("/api/buildings", (request, response) => {
    Building.find((err, data) => {
        if (err) {
            console.error(err);
        } else {
            response.send(data);
        }
    });
});

//ENDPOINTS USERS
api.get("/api/users", (request, response) => {
    User.find((err, data) => {
        if (err) {
            console.error(err);
        } else {
            response.send(data);
        }
    });
});

const PORT = 2005;
api.listen(PORT, () => {
    console.log(`Conexion corriendo en puerto ${PORT}`);
});