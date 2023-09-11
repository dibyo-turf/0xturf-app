"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("User_Gamers", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    });

    await queryInterface.addColumn("User_Gamers", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("User_Gamers", "createdAt");
    await queryInterface.removeColumn("User_Gamers", "updatedAt");
  },
};
