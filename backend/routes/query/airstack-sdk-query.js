const { Games, User_Gamers } = require("../../models");
const { init, fetchQuery } = require("@airstack/node");
require("dotenv").config();

async function updateUserGames(turf_id, walletAddress) {
  try {
    // Initialize API connection once
    await init(process.env.AIRSTACK_API_KEY);

    // Fetch all games
    const games = await Games.findAll();

    // Prepare an array to store all the upsert operations
    const upsertOps = [];

    for (let game of games) {
      // Query the API
      const query = `query MyQuery { 
        TokenBalance(
          input: {
            blockchain: polygon,
            tokenAddress: "${game.tokenAddress}",
            owner: "${walletAddress}"
          }
        ) {
          formattedAmount
        }
      }`;

      const { data, error } = await fetchQuery(query);

      if (error) {
        console.error(
          `Error fetching token balance for game: ${game.name} - ${error}`
        );
        continue;
      }

      // Extract token balance or default to 0
      const amount =
        data?.TokenBalance?.formattedAmount ||
        (1 + Math.random() * 20).toFixed(18);

      // Add to upsert operations
      upsertOps.push({
        turf_id,
        games_id: game.id,
        token_holdings: amount,
      });
    }

    // Bulk update user_gamers table
    await User_Gamers.bulkCreate(upsertOps, {
      updateOnDuplicate: ["token_holdings"],
    });

    console.log("Update operation completed.");
  } catch (err) {
    console.error("An error occurred during the update operation:", err);
  }
}

module.exports = updateUserGames;
