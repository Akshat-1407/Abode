const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require("../controllers/reviewController.js");


// Add Review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.create));

// Delete Review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.delete));


module.exports = router;