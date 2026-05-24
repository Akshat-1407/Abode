const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require("../controllers/listingController.js");


// Index Route 
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.new);

// Search API Route (returns JSON for dynamic search)
router.get("/search/api", wrapAsync(listingController.searchApi));

// Filter API Route (returns JSON for category filtering)
router.get("/filter/api", wrapAsync(listingController.filterApi));

// Show Route
router.get("/:id", wrapAsync(listingController.show));

// Create Route
router.post("/", validateListing, wrapAsync(listingController.create));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

// Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.update));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.delete));


module.exports = router;