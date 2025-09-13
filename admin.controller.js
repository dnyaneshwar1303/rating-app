const User = require("../models/user.model");
const Store = require("../models/store.model");
const Rating = require("../models/rating.model");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error: error.message });
  }
};
