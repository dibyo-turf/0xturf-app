const { Games, User_Gamers } = require("../../models"); // Adjust the path to your models as needed
const { init, fetchQuery } = require("@airstack/node");
require("dotenv").config();
async function updateUserGames(turf_id, walletAddress) {
  // 1. Fetch all games
  const games = await Games.findAll();

  for (let game of games) {
    // 2. Query the API
    const query = `query MyQuery { 
      TokenBalance(
        input: {
          blockchain: polygon,
          tokenAddress: "${game.tokenAddress}",
          owner: "${walletAddress}"
        }
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

    await init(process.env.AIRSTACK_API_KEY);
    const { data, error } = await fetchQuery(query);
    console.log(query, data);
    if (error) {
      console.error(
        `Error fetching token balance for game: ${game.name} - ${error}`
      );
      continue; // Skip to next game
    }

    // 3. Update user_gamers table
    var tokenBalance = data.TokenBalance;
    var amount;
    if (!tokenBalance) {
      amount = 0;
    } else {
      amount = tokenBalance.formattedAmount;
    }

    if (!amount) {
      amount = 0;
    }

    await User_Gamers.upsert({
      turf_id: turf_id,
      games_id: game.id,
      token_holdings: amount,
    });
  }
}

module.exports = updateUserGames;
