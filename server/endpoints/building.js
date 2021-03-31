const Building = require("../models/building");
const { toUpperCase } = require("../secret");

//ENDPOINTS BUILDINGS

module.exports = {
    register: (api) => {
        api.get("/api/buildings/:id", (req, res) => {
            //Building.findById(req.params.id, (err, data) => {
            Building.findOne({ _id: req.params.id }, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                } else {
                    res.send(data);
                }
            });
        });

        api.get("/api/buildings", (request, response) => {
            let company;

            if (request.query.company === undefined) {
                company = request.query.company;
            } else {
                company = request.query.company.toUpperCase();
            }
            const address = request.query.address;

            Building.find({
                    $or: [
                        { company: new RegExp(company) },
                        { address: new RegExp(address) },
                    ],
                },
                (err, data) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    response.send(data);
                }
            );
        });

        api.post("/api/buildings", (request, response) => {
            const building = new Building({
                company: request.body.company,
                address: request.body.address,
            });

            building
                .save()
                .then((savedBuilding) => {
                    // Ya sabemos que se ha guardado correctamente el edificio
                    response.status(201).send(savedBuilding);
                })
                .catch((err) => {
                    response.status(500).send(err);
                });
        });

        api.put("/api/buildings/:id", (req, res) => {
            Building.findByIdAndUpdate(
                req.params.id, { $set: req.body },
                (err, data) => {
                    if (err) res.status(500).send(err);
                    if (data) {
                        res.status(201).send({
                            success: "true",
                            message: "Edificio modificado",
                            Building: data,
                        });
                    } else {
                        res.status(404).send({
                            success: "true",
                            message: "Edificio no encontrado",
                            idBuilding: req.params.id,
                        });
                    }
                }
            );
        });

        api.delete("/api/buildings/:id", (req, res) => {
            Building.findByIdAndDelete(req.params.id, (err, data) => {
                if (err) res.status(500).send(err);
                if (data) {
                    res.status(201).send({
                        success: "true",
                        message: "Edificio eliminado",
                        idBuilding: req.params.id,
                    });
                } else {
                    res.status(404).send({
                        success: "true",
                        message: "Edificio no encontrado",
                        idBuilding: req.params.id,
                    });
                }
            });
        });
    },
};