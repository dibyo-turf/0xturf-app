const express = require("express");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
// Test Route
app.get("/", (req, res) => {
  res.send("Test Route");
});

// Use the user routes
app.use("/users", userRoutes);
app.use("/games", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
