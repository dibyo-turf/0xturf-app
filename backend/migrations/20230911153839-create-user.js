"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      turf_id: {
        type: Sequelize.STRING,
      },
      claims_id: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      discord: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      DID: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
