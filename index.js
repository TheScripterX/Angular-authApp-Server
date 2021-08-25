const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create Serve
const app = express();

// Cors - Middleware
app.use(cors());

// Body reading & parsing
app.use(express.json());

// Routes - Middleware
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
