const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const { swaggerServe, swaggerSetup } = require("./config/swagger.config");
const dotenv = require('dotenv').config();
const app = express();

// Test the database connection
sequelize.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
sequelize.sync();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const rootRouter = require('./route/root.route')
const itemRouter = require('./route/item.route')
const userRouter = require('./route/user.route')
const { auth } = require("./controller/auth.controller");

app.get('/', (req, res) => res.status(200).send('Welcome To Food Delivery App'));
app.use("/",rootRouter);
app.use('/user', auth, userRouter);
app.use('/item',auth, itemRouter);
app.use("/api-docs", swaggerServe, swaggerSetup)

app.listen(process.env.SERVER_PORT, () => console.log("Server is running: " + process.env.SERVER_PORT))

module.exports = app;
