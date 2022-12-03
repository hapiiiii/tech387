const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

class CourseCategoryController {
    getAll(req, res, next) {
        db.query(
            `SELECT * FROM courseCategory;`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: 'Nisu pronadene kategorije kurseva'
                    });
                }

                return res.status(200).send({
                    result
                });
            })
    }

    getOne(req, res, next) {
        db.query(
            `SELECT * FROM courseCategory WHERE name = '${req.params.name}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.params.name}`
                    });
                }

                if (!result.length) {
                    return res.status(409).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.params.name}`
                    });
                }

                return res.status(200).send({
                    result
                });
            })
    }

    insert(req, res, next) {
        db.query(
            `SELECT * FROM courseCategory WHERE name = '${req.body.name}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.body.name}`
                    });
                }

                if (result.length) {
                    return res.status(409).send({
                        message: `Vec postoji kategorija sa nazivom ${req.body.name}`
                    });
                }

                db.query(
                    `INSERT INTO courseCategory (id, name, description) VALUES ('${uuid.v4()}', ${db.escape(req.body.name
                        )}, ${db.escape(req.body.description)} )`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: 'Interni server error.'
                            });
                        }

                        return res.status(200).send({
                            message: 'Uspijesno dodana kategorija.'
                        });
                    })
            })
    }

    update(req, res, next) {
        db.query(
            `SELECT * FROM courseCategory WHERE name = '${req.params.oldName}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.params.oldName}`
                    });
                }

                if (!result.length) {
                    return res.status(409).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.params.oldName}`
                    });
                }

                db.query(
                    `SELECT * FROM courseCategory WHERE name = '${req.body.name}';`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: `Nije pronadena kategorija sa nazivom ${req.body.name}`
                            });
                        }

                        if (result.length) {
                            return res.status(409).send({
                                message: `Vec postoji kategorija sa nazivom ${req.body.name}`
                            });
                        }

                        db.query(
                            `UPDATE courseCategory SET name = '${req.body.name}', description = '${req.body.description}' WHERE name = '${req.params.oldName}'`,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).send({
                                        message: 'Interni server error.'
                                    });
                                }

                                return res.status(200).send({
                                    message: 'Uspijesno izmjenjena kategorija.'
                                });
                            })
                    });
            })
    }

    delete(req, res, next) {
        db.query(
            `SELECT * FROM courseCategory WHERE name = '${req.params.name}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.params.name}`
                    });
                }

                if (!result.length) {
                    return res.status(409).send({
                        message: `Nije pronadena kategorija sa nazivom ${req.params.name}`
                    });
                }
                db.query(
                    `DELETE FROM courseCategory WHERE name = '${req.params.name}';`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: 'Interni server error.'
                            });
                        }

                        return res.status(200).send({
                            message: 'Uspijesno izbrisana kategorija.'
                        });
                    });

            });


    }
}

module.exports = CourseCategoryController;