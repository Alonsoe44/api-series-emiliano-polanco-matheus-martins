require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { notFoundError, generalError } = require("./middlewares/errors");
const route = require("./routes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/", route);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
