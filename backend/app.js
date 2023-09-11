const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Test Route");
});

// Use the user routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
