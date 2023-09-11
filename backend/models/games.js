const { Model, DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  class Games extends Model {}

  Games.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gameType: {
        type: DataTypes.STRING,
        allowNull: true,
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
