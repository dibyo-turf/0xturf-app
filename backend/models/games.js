const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Games extends Model {}

  Games.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Games",
      timestamps: false,
    }
  );

  return Games;
};
