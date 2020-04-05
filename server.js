require('dotenv').config();

const express = require('express');
const exphbs = require("express-handlebars");
const orm = require('./config/orm');

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const router = require("./controllers/burgerController.js");

app.use(router);

async function main() {

  await orm.connect();
  app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
