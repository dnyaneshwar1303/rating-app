const Store = require("../models/store.model");
const User = require("../models/user.model");
const Rating = require("../models/rating.model");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");


exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id,
    });

    res.status(201).json({ message: "Store created successfully", storeId: store.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating store", error: error.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
        {
          model: Rating,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.fn("AVG", Sequelize.col("Ratings.rating")),
            "averageRating",
          ],
        ],
      },
      group: ["Store.id"],
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores", error: error.message });
  }
};


exports.getStoresForUsers = async (req, res) => {
  try {
    const { name, address } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      include: [
        { model: User, as: "owner", attributes: ["id", "name", "email"] },
        {
          model: Rating,
          attributes: ["rating", "user_id"],
        },
      ],
    });

    // Format response: overall rating + user rating
    const formattedStores = stores.map((store) => {
      const ratings = store.Ratings.map((r) => r.rating);
      const avgRating = ratings.length
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : null;

      const userRating = store.Ratings.find((r) => r.user_id === req.user.id);

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating: avgRating,
        userRating: userRating ? userRating.rating : null,
      };
    });

    res.json(formattedStores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores", error: error.message });
  }
};
