const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

class UserController {
  login(req, res, next) {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            message: 'Pogresan e-mail ili password'
          });
        }

        if (!result.length) {
          return res.status(401).send({
            message: 'Pogresan e-mail ili password'
          });
        }

        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(401).send({
                message: 'Pogresan e-mail ili password'
              });
            }

            if (bResult) {
              const token = jwt.sign({
                  email: result[0].email
                },
                'SECRETKEY', {
                  expiresIn: '7d'
                }
              );

              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                message: 'Uspijesna prijava',
                token,
                userEmail: result[0].email
              });
            }
            return res.status(401).send({
              message: 'Pogresan e-mail ili password'
            });
          }
        );
      }
    );
  }

  register(req, res, next) {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
              req.body.email
            )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            message: 'Ovaj mail se vec koristi !'
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                message: err
              });
            } else {
              db.query(
                `INSERT INTO users (id, email, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                        req.body.email
                      )}, ${db.escape(hash)}, now())`,
                (err, result) => {
                  if (err) {
                    return res.status(400).send({
                      message: 'Interni server error.'
                    });
                  }
                  const token = jwt.sign({
                      email: req.body.email
                    },
                    'SECRETKEY', {
                      expiresIn: '7d'
                    }
                  );
                  return res.status(200).send({
                    message: 'Uspijesna registracija',
                    token,
                    userEmail: req.body.email
                  });
                }
              );
            }
          });
        }
      }
    );
  }
}

module.exports = UserController;