const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);