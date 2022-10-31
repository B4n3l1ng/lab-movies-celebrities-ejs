const express = require("express");
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const { route } = require(".");
const router = express.Router();

router.get("/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    console.log(celebrities);
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.render("movies/new-movie");
  }
});

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:movieId", async (req, res) => {
  const movie = await Movie.findById(req.params.movieId).populate(
    "cast",
    " ",
    Celebrity
  );
  res.render("movies/movie-details", { movie });
});

module.exports = router;
