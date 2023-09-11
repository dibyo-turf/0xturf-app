const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Register Route
router.post("/register-login", async (req, res) => {
  try {
    const { turf_id, address } = req.body;

    // Validation
    if (!turf_id || !address) {
      return res
        .status(400)
        .json({ error: "Both turf_id and address are required." });
    }

    // Check if user already exists
    let user = await User.findOne({ where: { address } });

    if (!user) {
      // Register the user if they don't exist
      user = await User.create({
        turf_id,
        address,
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
