const createUser = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  return res.json({
    ok: true,
    msg: "Create new user /new",
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

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
