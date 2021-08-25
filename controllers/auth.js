const createUser = (req, res) => {
  return res.json({
    ok: true,
    msg: "Create new user /new",
  });
};

const loginUser = (req, res) => {
  return res.json({
    ok: true,
    msg: "Login user /",
  });
};

const renewToken = (req, res) => {
  return res.json({
    ok: true,
    msg: "Renew Token",
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
