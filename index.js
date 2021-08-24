const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Everything is OK",
    uid: 1234,
  });
});

app.listen(4000, () => {
  console.log(`Server running on ${4000}`);
});
