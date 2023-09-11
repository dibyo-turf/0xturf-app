const express = require("express");
const router = express.Router();
const { User } = require("../models");
const updateUserGames = require("./query/airstack-sdk-query.js");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    const query = `query MyQuery { 
  TokenBalance(
    input: {blockchain: polygon, tokenAddress: "0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE", owner: "0x2cac89ABf06DbE5d3a059517053B7144074e1CE5"}
  ) {
    amount
    formattedAmount
    lastUpdatedBlock
    lastUpdatedTimestamp
    tokenType
    token {
      name
      symbol
    }
  }
}`;
    await init("ae1c681745c847feaf81654530cfad10");
    const { data, error } = await fetchQuery(query);
    console.log(data);

    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

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

module.exports = router;
