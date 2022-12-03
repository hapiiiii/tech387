const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    let emailRegex = new RegExp('^[\\w!#$%&’*+/=?`{|}~^-šđžčćŠĐŽČĆ]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-šđžčćŠĐŽČĆ]+)*@(?:[a-zA-ZšđžčćŠĐŽČĆ0-9-]+\\.)+[a-zA-ZšđžčćŠĐŽČĆ]{2,6}$');
    if (!req.body.email || emailRegex.test(req.body.email) == false) {
      return res.status(400).send({
        msg: 'Pogresan e-mail ili password'
      });
    }
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }
    next();
  }
};