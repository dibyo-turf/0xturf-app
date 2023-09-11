const db = require("../models/index.js");
const User_Gamers = db.User_Gamers;
const Games = db.Games;
function getRandomDecimal(min, max, decimalPlaces = 18) {
  const pow = Math.pow(10, decimalPlaces);
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

async function seedUserGamers(turfId, userAddress) {
  // Fetch the top 10 game IDs
  const topGames = await Games.findAll({
    limit: 10,
    attributes: ["id"],
  });

  const userGamersData = [];

  for (let game of topGames) {
    const randomHolding = getRandomDecimal(1, 20);

    userGamersData.push({
      turf_id: turfId,
      games_id: game.id,
      token_holdings: randomHolding,
    });
  }

  try {
    await User_Gamers.bulkCreate(userGamersData);
    console.log("User_Gamers seeded successfully!");
  } catch (error) {
    console.error("Error seeding User_Gamers:", error);
  }
}

const turfId = "0xProG.turf";
const userAddress = "0xEF8817ef9D776605dD2fF7ae87c7103915F0630f";
seedUserGamers(turfId, userAddress);
