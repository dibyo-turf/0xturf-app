const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User_Gamers extends Model {}

  User_Gamers.init(
    {
      turf_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
      games_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      token_holdings: DataTypes.DECIMAL(20, 18),
    },
    {
      sequelize,
      modelName: "User_Gamers",
    },
    {
      sequelize,
      modelName: "User_Gamers",
      timestamps: false, // Disable timestamps
    }
  );

  return User_Gamers;
};
