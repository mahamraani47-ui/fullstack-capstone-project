const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

router.get("/api/search", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const category = req.query.category;

    const query = category ? { category: category } : {};

    const items = await db.collection("gifts").find(query).toArray();

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
