const db = require("../models/index.js");
const Games = db.Games;

const gameTypes = [
  "RPG",
  "Shooter",
  "Strategy",
  "Adventure",
  "Puzzle",
  "Arcade",
  "Simulation",
  "Sports",
  "Horror",
  "Platformer",
];

function getRandomGameType() {
  return gameTypes[Math.floor(Math.random() * gameTypes.length)];
}

async function updateGameTypes() {
  try {
    const games = await Games.findAll();

    for (const game of games) {
      game.gameType = getRandomGameType();
      await game.save();
    }

    console.log("Games updated successfully!");
  } catch (error) {
    console.error("Error updating games:", error);
  }
}

updateGameTypes();
