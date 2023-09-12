const db = require("../models/index.js");
const express = require("express");
const router = express.Router();
const { Games } = require("../models");

router.get("/search", async (req, res) => {
  try {
    const { query_value } = req.query;

    if (!query_value) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const games = await Games.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: "%" + query_value + "%",
        },
      },
    });

    res.json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
