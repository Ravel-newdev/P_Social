const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token inválido" });
  }
}

<<<<<<< HEAD

module.exports = checkToken
=======
function checkRefreshToken(req, res,next) {
  const refreshToken = req.body;

  if (!refreshToken) {
    return res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(refreshToken, secret, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
    });

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token inválido" });
  }
}

module.exports = { checkToken, checkRefreshToken };
>>>>>>> f0efb0b3ff2d693af630a01126ac0a4184d40783
