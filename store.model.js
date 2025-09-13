const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");

const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    validate: { isEmail: true },
  },
  address: {
    type: DataTypes.STRING(400),
  },
});

// Relations
User.hasMany(Store, { foreignKey: "owner_id" });
Store.belongsTo(User, { as: "owner", foreignKey: "owner_id" });

module.exports = Store;
