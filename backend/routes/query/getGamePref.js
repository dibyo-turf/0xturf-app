const db = require("../../models/index.js");
const User_Gamers = db.User_Gamers;
const Games = db.Games;

async function getUserGameTypePercentages(userId) {
  try {
    // 1. Fetch all games associated with the user
    const userGames = await User_Gamers.findAll({
      where: { turf_id: userId },
      attributes: ["games_id"],
    });

    if (!userGames || userGames.length === 0) {
      console.log("User has no games.");
      return;
    }

    // 2. Fetch the game types for the fetched games
    const gameIds = userGames.map((ug) => ug.games_id);
    const games = await Games.findAll({
      where: { id: gameIds },
      attributes: ["gameType"],
    });

    // 3. Count the occurrences of each game type
    const gameTypeCounts = {};

    for (const game of games) {
      const gameType = game.gameType;
      gameTypeCounts[gameType] = (gameTypeCounts[gameType] || 0) + 1;
    }

    // 4. Calculate the percentage for each game type and filter out 0 percentages
    const totalGames = games.length;
    const gameTypePercentages = {};

    for (const gameType in gameTypeCounts) {
      const percentage = (gameTypeCounts[gameType] / totalGames) * 100;
      if (percentage > 0) {
        gameTypePercentages[gameType] = percentage.toFixed(2);
      }
    }

    console.log(gameTypePercentages);
    return gameTypePercentages;
  } catch (error) {
    console.error("Error fetching user's game percentages:", error);
  }
}

module.exports = getUserGameTypePercentages;

// Test
// getUserGameTypePercentages("0xProG.turf");
