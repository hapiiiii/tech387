const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

class CourseController {
    getAll(req, res, next) {
        db.query(
            `SELECT * FROM course;`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: 'Nisu pronadeni kursevi'
                    });
                }

                return res.status(200).send({
                    result
                });
            })
    }

    getOne(req, res, next) {
        db.query(
            `SELECT * FROM course WHERE name = '${req.params.name}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronaden kurs sa nazivom ${req.params.name}`
                    });
                }

                if (!result.length) {
                    return res.status(409).send({
                        message: `Nije pronaden kurs sa nazivom ${req.params.name}`
                    });
                }

                return res.status(200).send({
                    result
                });
            })
    }

    insert(req, res, next) {
        db.query(
            `INSERT INTO course (id, name, description, link, courseCategoryId) VALUES ('${uuid.v4()}', ${db.escape(req.body.name
                        )}, ${db.escape(req.body.description)}, ${db.escape(req.body.link)},  ${db.escape(req.body.courseCategoryId)} )`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: 'Interni server error.'
                    });
                }

                return res.status(200).send({
                    message: 'Uspijesno dodan kurs.'
                });
            })

    }

    update(req, res, next) {
        db.query(
            `SELECT * FROM course WHERE name = '${req.params.oldName}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronaden kurs sa nazivom ${req.params.oldName}`
                    });
                }

                if (!result.length) {
                    return res.status(409).send({
                        message: `Nije pronaden kurs sa nazivom ${req.params.oldName}`
                    });
                }
                db.query(
                    `UPDATE course SET name = '${req.body.name}', description = '${req.body.description}', link = '${req.body.link}', courseCategoryId = '${req.body.courseCategoryId}'  WHERE name = '${req.params.oldName}'`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: 'Interni server error.'
                            });
                        }

                        return res.status(200).send({
                            message: 'Uspijesno izmjenjen kurs.'
                        });
                    })
            });

    }

    delete(req, res, next) {
        db.query(
            `SELECT * FROM course WHERE name = '${req.params.name}';`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: `Nije pronaden kurs sa nazivom ${req.params.name}`
                    });
                }

                if (!result.length) {
                    return res.status(409).send({
                        message: `Nije pronaden kurs sa nazivom ${req.params.name}`
                    });
                }
                db.query(
                    `DELETE FROM course WHERE name = '${req.params.name}';`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: 'Interni server error.'
                            });
                        }

                        return res.status(200).send({
                            message: 'Uspijesno izbrisan kurs.'
                        });
                    });

            });


    }
}

module.exports = CourseController;