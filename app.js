import express from "express";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const app = express();
const PORT = 3000;

/// dirname paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/// movies array
const movies = [];

/// EJS setting
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/// parse of form data
app.use(express.urlencoded({ extended: true }));

/// static files
app.use(express.static(path.join(__dirname, "public")));

/// form
app.get("/", (req, res) => {
  res.render("form", { error: null });
});

/// form handling
app.post("/submit", (req, res) => {
  const { movieName, rating } = req.body;

  if (!movieName || isNaN(rating) || rating < 1 || rating > 10) {
    res.render("form", {
      error: "Please enter a valid movie name and rating (1-10).",
      movieName,
      rating,
    });
  } else {
    movies.push({ movieName, rating });
    res.render("success", { movieName, rating });
  }
});
/// movie route
app.get("/movies", (req, res) => {
  res.render("movies", { movies });
});

/// Deleting movie route
app.post("/delete/:index", (req, res) => {
  const { index } = req.params;
  movies.splice(index, 1);
  res.redirect("/movies");
});

///running server
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
