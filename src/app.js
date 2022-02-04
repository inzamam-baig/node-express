const path = require("path");
const express = require("express");
const hbs = require("hbs");

// initializing express
const app = express();

// path config
// static files
const publicDirectory = path.join(__dirname, "../public");
// template engine views
const viewsPath = path.join(__dirname, "../templates/views");
// partials path
const partialsPath = path.join(__dirname, "../templates/partials");

// hbs config
// setting view engine
app.set("view engine", "hbs");
// setting template engine view
app.set("views", viewsPath);
// setting partials
hbs.registerPartials(partialsPath);

// static directory config
// static html files
app.use(express.static(publicDirectory));

// routes with view engine
app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    data: "Copyright 2022",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    data: "Copyright 2022",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    data: "Copyright 2022",
  });
});

// Query String

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Location is required",
    });
  }
  res.send({
    location: `It's 9deg in ${req.query.search}`,
  });
});

app.get("/users", (req, res) => {
  if (!req.query.name) {
    return res.send({
      error: "Name is required",
    });
  }
  res.send({
    users: [],
  });
});

// 404 Page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page Not Found",
    data: "Copyright 2022",
  });
});

// routes
// app.get("/", (req, res) => {
//   res.send({
//     page: "index",
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Us</h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send({ city: "Los Angeles", state: "California" });
// });
// Starting the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
