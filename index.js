if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const weather = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=London`
  );
  const location = "London";
  const { temp_c, humidity, wind_kph } = weather.data.current;
  const { text, icon } = weather.data.current.condition;
  res.render("index", { location, temp_c, humidity, wind_kph, text, icon });
});

app.post("/", async (req, res) => {
  const { location } = req.body;
  const weather = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}`
  );
  const { temp_c, humidity, wind_kph } = weather.data.current;
  const { text, icon } = weather.data.current.condition;

  res.render("index", { location, temp_c, humidity, wind_kph, text, icon });
  console.log(temp_c, text, icon, humidity, wind_kph);
});

app.all("*", (req, res) => {
  res.send("Page Not Found!!");
});

app.listen(3000, () => {
  console.log("LISTENING TO PORT 3000!!");
});
