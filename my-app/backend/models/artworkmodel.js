// models/artworkModel.js
const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  artBy: { type: String, default: "" },
  age: { type: Number, default: null },
  school: { type: String, default: "" },
  imageUrl: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model("Artwork", artworkSchema);
