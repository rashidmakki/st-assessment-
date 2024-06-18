const express = require("express");
const { createUser, login } = require("../controller/user.controller")

const rootRouter = express.Router();

rootRouter.route("/signup").post(createUser);
rootRouter.route("/login").post(login);

module.exports = rootRouter;