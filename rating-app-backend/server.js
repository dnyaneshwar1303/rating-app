const express = require("express");
const cors = require("cors");

const bcrypt = require("bcryptjs");
bcrypt.hash("Admin@123", 10).then(h => console.log(" Fresh Admin hash:", h));


const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const storeRoutes = require("./routes/store.routes");
const adminRoutes = require("./routes/admin.routes");
const ratingRoutes = require("./routes/rating.routes");
const ownerRoutes = require("./routes/owner.routes");


require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/admin", adminRoutes);
app.use("/ratings", ratingRoutes);
app.use("/owner", ownerRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB and start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  // Sync models
  await sequelize.sync({ alter: true });
  console.log(` Server running on port ${PORT}`);
});
