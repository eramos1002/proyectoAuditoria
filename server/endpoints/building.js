const { query } = require("express");
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
        //LISTADO, filtro
        api.get("/api/buildings", (request, response) => {
            let total, skip, limit;
            const filter = {};

            if (request.query.company !== undefined) {
                filter.company = new RegExp(request.query.company);
            }

            if (request.query.address !== undefined) {
                filter.address = new RegExp(request.query.address);
            }

            if (request.query.skip !== undefined) {
                skip = parseInt(request.query.skip);
            }

            if (request.query.limit !== undefined) {
                limit = parseInt(request.query.limit);
            }

            // Estilo callback (El callback es: (err, _total) => { ... })
            /*
                                    Building.countDocuments(filter, (err, _total) => {
                                        if (err) {
                                            response.status(500).send(err);
                                            return;
                                        }
                                        total = _total;

                                        Building.find(filter, (err, data) => {
                                            if (err) {
                                                response.status(500).send(err);
                                                return;
                                            }
                                            response.status(200).send({
                                                success: "true",
                                                total: total,
                                                buildings: data,
                                            });
                                        });
                                    });
                                    */

            Building.countDocuments(filter)
                .then((_total) => {
                    total = _total;
                    return Building.find(filter, null, { skip, limit }); // = {skip: skip, limit: limit} // Si el nombre de la variable es igual al nombre del campo se puede poner solo el nombre
                })
                .then((data) => {
                    response.status(200).send({
                        success: "true",
                        total: total,
                        buildings: data,
                    });
                })
                .catch((err) => {
                    response.status(500).send(err);
                    return;
                });
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
                    response.status(500).send({ message: err.toString() });
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