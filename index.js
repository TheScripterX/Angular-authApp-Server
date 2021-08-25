const express = require("express");

//Create Serve
const app = express();

//Routes - Middleware
app.use("/api/auth", require("./routes/auth"));

app.listen(4000, () => {
  console.log(`Server running on ${4000}`);
});
