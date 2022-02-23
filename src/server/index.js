require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { notFoundError, generalError } = require("./middlewares/errors");
const platformRouter = require("./routes/platformRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/users", usersRouter);
app.use("/platforms", platformRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
