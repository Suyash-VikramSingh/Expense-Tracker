const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/expense-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
