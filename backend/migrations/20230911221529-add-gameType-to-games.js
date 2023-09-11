module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Games", "gameType", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Games", "gameType");
  },
};
