var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", async (req, res) => {
  const burgers = await burger.getAll();

  res.render("index", { burgers });
});

router.get("/api/burgers", async (req, res) => {
  const burgers = await burger.getAll();
  res.json(burgers);
});

router.post("/api/burgers", async (req, res) => {
  const { burger_name, devoured } = req.body;

  try {
    const newBurger = await burger.create({ burger_name, devoured });
    res.json(newBurger);
  } catch (error) {
    console.log(error);
    res.end()
  }

});

router.put("/api/burgers/:id", async (req, res) => {
  const { 
    params: { id },
    body: {
      devoured: stringDevoured
    }
  } = req;

  const devoured = (stringDevoured === 'true');

  try {
    const updatedBurger = await burger.updateByID(id, { devoured });
    res.json(updatedBurger);
  } catch (error) {
    console.log(error);
    res.end()
  }
})

module.exports = router;