"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_gamers", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      turf_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "turf_id",
        },
      },
      games_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "games",
          key: "id",
        },
      },
      token_holdings: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_gamers");
  },
};
