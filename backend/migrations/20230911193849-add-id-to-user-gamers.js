"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the id column
    await queryInterface.addColumn("User_Gamers", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert games_id to be a primary key (assuming it was before)
    await queryInterface.changeColumn("User_Gamers", "games_id", {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    });

    // Remove the id column
    await queryInterface.removeColumn("User_Gamers", "id");
  },
};
