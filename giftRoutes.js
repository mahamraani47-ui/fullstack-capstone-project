const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection("gifts").find({}).toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
});

router.get("/api/gifts/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection("gifts").findOne({
      _id: req.params.id
    });

    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }

    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gift" });
  }
});

module.exports = router;
