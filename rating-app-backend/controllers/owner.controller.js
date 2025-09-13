const Store = require("../models/store.model");
const Rating = require("../models/rating.model");
const User = require("../models/user.model");
const { Sequelize } = require("sequelize");

exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Find store of this owner
    const store = await Store.findOne({
      where: { owner_id: ownerId },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({ message: "No store found for this owner" });
    }

    // Average rating
    const ratings = store.Ratings.map((r) => r.rating);
    const avgRating = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : null;

    // List of users who rated
    const ratedUsers = store.Ratings.map((r) => ({
      id: r.User.id,
      name: r.User.name,
      email: r.User.email,
      rating: r.rating,
    }));

    res.json({
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
      },
      averageRating: avgRating,
      ratedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error: error.message });
  }
};
