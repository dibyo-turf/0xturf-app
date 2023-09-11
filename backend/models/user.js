const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      turf_id: DataTypes.STRING,
      claims_id: DataTypes.STRING,
      address: DataTypes.STRING,
      discord: DataTypes.STRING,
      email: DataTypes.STRING,
      DID: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
