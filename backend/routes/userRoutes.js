const express = require("express");
const router = express.Router();
const { User } = require("../models");
const updateUserGames = require("./query/airstack-sdk-query.js");
const getUserDetails = require("./query/getUser.js");

// Register Route
router.post("/register-login-metamask", async (req, res) => {
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

      await updateUserGames(turf_id, address);
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const { turfId } = req.query;
    if (!turfId) {
      return res.status(400).json({ error: "turfId is required" });
    }

    const user = await getUserDetails(turfId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
