const db = require("../models/index.js");
const Games = db.Games;

const crypto = require("crypto");

const gameNames = [
  "Polygon's Quest",
  "Matic Warrior",
  "Crypto Kingdom",
  "Defi Duel",
  "Ethos Expedition",
  "Plasma Playground",
  "Chainlink Champions",
  "ZK-Zone",
  "Metamask Mysteries",
  "Gasless Galaxy",
];

async function seedGames() {
  console.log(Games);
  const games = [];

  for (let i = 0; i < gameNames.length; i++) {
    // Create a random Ethereum address.
    const randomAddress = "0x" + crypto.randomBytes(20).toString("hex");

    games.push({
      name: gameNames[i],
      tokenAddress: randomAddress,
    });
  }

  try {
    await Games.bulkCreate(games);
    console.log("Games seeded successfully!");
  } catch (error) {
    console.error("Error seeding games:", error);
  }
}

seedGames();
