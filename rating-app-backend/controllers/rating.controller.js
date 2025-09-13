const Rating = require("../models/rating.model");

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1–5" });
    }

    // Check if rating exists
    let existingRating = await Rating.findOne({ where: { user_id: userId, store_id: storeId } });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: "Rating updated successfully" });
    }

    await Rating.create({ user_id: userId, store_id: storeId, rating });
    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating", error: error.message });
  }
};
