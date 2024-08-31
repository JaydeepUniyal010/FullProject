// module.exports.listingSchema = Joi.object({
// listing : Joi.object({
//     title : Joi.string().required(),
//     description : Joi.string().required(),
//     price : Joi.number().required().min(0),
//     location : Joi.string().required(),
//     image : Joi.string().allow("",null),
//     country :Joi.string().required(),

// }).required(),
// });

// module.exports.reviewSchema = Joi.object({
//     review : Joi.object({
//         rating : Joi.number().required().min(1).max(5),
//         comment : Joi.string().required(),
//     }).required(),
//     })


const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().error(new Error('Title is required')),
    description: Joi.string().required().error(new Error('Description is required')),
    price: Joi.number().required().min(0).error(new Error('Price must be a positive number')),
    location: Joi.string().required().error(new Error('Location is required')),
    image: Joi.string().allow("", null),
    country: Joi.string().required().error(new Error('Country is required')),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5).error(new Error('Rating must be between 1 and 5')),
    comment: Joi.string().required().error(new Error('Comment is required')),
  }).required(),
});





