const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  const payload = { uid, name };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "24H",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
