const express = require("express");
const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");

const app = express();

app.use(express.json());

app.use(giftRoutes);
app.use(searchRoutes);

app.get("/api/search", (req, res) => {
  res.json({ message: "Search route is available" });
});

module.exports = app;
