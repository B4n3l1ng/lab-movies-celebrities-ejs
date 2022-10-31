const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const router = express.Router();

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  try {
    await Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
    res.render("celebrities/new-celebrity");
  }
});

router.get("/", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
