const Building = require("../models/building");

//ENDPOINTS BUILDINGS

module.exports = {
    register: api => {
        api.get("/api/buildings", (request, response) => {
            Building.find((err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    response.send(data);
                }
            });
        })
    }
}
