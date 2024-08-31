const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Reviews = mongoose.model("Review", reviewSchema);

module.exports = Reviews;



// niche wala bhi thik hai

// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   // define your fields here
//   comment: String,
//   rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//   },
//   createdAt: {
//       type: Date,
//       default: Date.now(),
//   }
// });

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;