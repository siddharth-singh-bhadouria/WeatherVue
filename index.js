if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

// const externalLink =

app.post("/", (req, res) => {
  const { location } = req.body;
  const weather = `http://api.weatherapi.com/v1/current.json?key=API_KEY&q=${location}`;
  console.log(weather);
});

app.all("*", (req, res) => {
  res.send("Page Not Found!!");
});

app.listen(3000, () => {
  console.log("LISTENING TO PORT 3000!!");
});
