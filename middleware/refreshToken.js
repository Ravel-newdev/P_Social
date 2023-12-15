const jwt = require('jsonwebtoken')

function checkRefreshToken(req, res,next) {
    const {refreshToken} = req.body;
  
    if (!refreshToken) {
      return res.status(401).json({ msg: "acesso negado" });
    }
  
    try {
      const secret = process.env.SECRET;
      jwt.verify(refreshToken, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "Token inválido" });
    }
  }
  
  module.exports = checkRefreshToken