"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("users", ["turf_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("users", ["turf_id"]);
  },
};
