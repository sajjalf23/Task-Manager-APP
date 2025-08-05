const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('./Models/db');
const bodyParser = require("body-parser");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const taskRouter = require("./Routes/task");
app.use("/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
