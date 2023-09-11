const db = require("../../models/index.js");
const User_Gamers = db.User_Gamers;
const Games = db.Games;
const Users = db.User;
const getUserGameTypePercentages = require("./getGamePref.js");

async function getUserDetails(turf_Id) {
  // 1. Fetch basic user details
  const user = await Users.findOne({
    where: { turf_id: turf_Id },
  });

  if (!user) throw new Error("User not found");

  // 2. Fetch user's gaming preferences and total games played
  const userGames = await User_Gamers.findAll({
    where: { turf_id: turf_Id },
  });

  const totalGamesPlayed = userGames.length;
  // Fetching game names separately (if needed)
  let gameNames = [];
  for (let userGame of userGames) {
    const game = await Games.findOne({
      where: { id: userGame.games_id },
      attributes: ["name"],
    });
    if (game) gameNames.push(game.name);
  }
  const gamePref = await getUserGameTypePercentages(turf_Id);
  return {
    userDetails: user,
    gamePreferences: gamePref,
    gameNames,
    totalGamesPlayed,
  };
}

module.exports = getUserDetails;
