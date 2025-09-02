const Joi = require("joi");
const mongoose = require("mongoose");

// -------------------
// Joi Validation Schemas
// -------------------
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    category: Joi.alternatives().try(
      Joi.string(),
      Joi.array().items(Joi.string())
    )
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

// -------------------
// Mongoose Schemas & Models
// -------------------
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  country: String,
  price: { type: Number, min: 0 },
  image: String,
  category: [String], // allows multiple categories
});

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

// Export Mongoose Models
module.exports.Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
module.exports.Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

