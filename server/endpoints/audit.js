const Audit = require("../models/audit");

//ENDPOINTS AUDITS

module.exports = {
    register: (api) => {
        api.get("/api/audits", (request, response) => {
            Audit.find((err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    response.send(data);
                }
            });
        });
    },
};