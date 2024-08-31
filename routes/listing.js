const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); // storage in cloudinary

// Override methods for form submissions like PUT and DELETE
router.use(methodOverride('_method'));

// Index Route 
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"), 
    validateListing,
    wrapAsync(listingController.createListing) 
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm); 
  
// Filter Route
router.get("/filter/:q", wrapAsync(listingController.filterListings));

// Search Route
router.get("/search", wrapAsync(listingController.search));

// Show Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;



// code is correct but length massy.
// const express = require("express");
// const router= express.Router();
// const methodOverride = require('method-override');
// const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
// const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
// const listingController = require("../controllers/listing");
// const multer  = require('multer');
// const {storage} = require("../cloudConfig.js");
// const upload = multer({storage}); // storage in cloudnariy


// // Override methods for form submissions like PUT and DELETE
// router.use(methodOverride('_method'));

// //Index Route 
// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     isLoggedIn,
//     upload.single("listing[image]"), // corrected the field name
//     validateListing,
//     wrapAsync(listingController.createListing) 
//   );

// //New Route
// router.get("/new", isLoggedIn, listingController.renderNewForm); 
  
// //Show Route
// router
// .route("/:id")
// .get(wrapAsync(listingController.showListing))
// .put(
//   isLoggedIn,
//   isOwner,
//   upload.single("listing[image]"),
//   validateListing,
//   wrapAsync(listingController.updateListing)
// )
// .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));
  
// // //Create Route
// // router.post("/", isLoggedIn, validateListing, wrapAsync(listingsController.createListing));
  
// //Edit Route
// router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// //Update Route
// router.put("/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

// //Delete Route
// //router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));
  

// module.exports = router;