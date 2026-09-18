const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

router.post("/api/auth/register", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    await db.collection("users").insertOne(user);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/api/auth/login", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.put("/api/auth/update", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await db.collection("users").updateOne(
      { email: req.body.email },
      { $set: req.body }
    );

    res.json({ message: "User information updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
