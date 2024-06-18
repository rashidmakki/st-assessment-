
// const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express');
const YAML = require("yamljs");
const swaggerJsDoc = YAML.load("apis.yaml");

module.exports = {swaggerServe: swaggerUI.serve ,swaggerSetup:swaggerUI.setup(swaggerJsDoc)};
