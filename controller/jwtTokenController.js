const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

class jwtTokenController {
    insert(token, email){
        db.query(`INSERT INTO jwtToken (token, email) VALUES (${db.escape(token)}, ${db.escape(email)})`,
        (err, result) => {
            if(err){
                throw err;
            }
        });
    }

    delete(token, email) {
        try{
            this.checkValid(token, email)
        } catch(err){
            throw err;
        }
        db.query(`DELETE FROM jwtToken WHERE token = '${token}'`,
        (err, result) => {
            if(err){
                throw err;
            }
        });
    }

    checkValid(token, email){
        return db.query(`SELECT FROM jwtToken WHERE token = '${token}'`,
        (err, result) => {
            if(err || !result){
                throw err;
            }
        });
    }
}

module.exports = jwtTokenController;