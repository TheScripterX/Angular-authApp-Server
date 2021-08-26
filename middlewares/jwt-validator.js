const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(403).json({
      ok: false,
      msg: "Token error",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.PRIVATE_KEY);
    req.uid = uid;
    req.name = name;
    console.log(uid, name);
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalid",
    });
  }

  // If all good OK
  next();
};

module.exports = {
  validateJWT,
};
