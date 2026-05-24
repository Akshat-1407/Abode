const Listing = require("../models/listing.js");

// Index - Display all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};



// New - Show create listing form
module.exports.new = (req, res) => {
  res.render("./listings/new.ejs");
};



// Create - Add new listing to database
module.exports.create = async (req, res) => {
  let { title, description, price, location, country, image = "" } = req.body;

  const newListing = new Listing({
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
    image: image,
  });

  newListing.owner = req.user._id;
  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};



// Show - Display single listing details
module.exports.show = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};



// Edit - Show edit listing form
module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
};



// Update - Update listing in database
module.exports.update = async (req, res) => {
  let { id } = req.params;
  let { title, description, price, location, country, image } = req.body;
  await Listing.findByIdAndUpdate(id, {
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
    image: image,
  });

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};



// Delete - Remove listing from database
module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};



// Search API - Get listings matching search query (JSON response)
module.exports.searchApi = async (req, res) => {
  let { query } = req.query;

  if (!query || query.trim() === "") {
    // Return all listings when query is empty
    const allListings = await Listing.find({}).populate("owner");
    return res.json({ listings: allListings });
  }

  // Search by title, description, location, or country (case-insensitive)
  const searchResults = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
    ],
  }).populate("owner");

  res.json({ listings: searchResults });
};



// Filter API - Get listings by category (JSON response)
module.exports.filterApi = async (req, res) => {
  let { category } = req.query;

  if (!category || category.trim() === "") {
    // Return all listings if no category specified
    const allListings = await Listing.find({}).populate("owner");
    return res.json({ listings: allListings });
  }

  // Map filter categories to search keywords
  const categoryKeywords = {
    trending: "",
    rooms: "room",
    iconic: "iconic",
    mountains: "mountain",
    castles: "castle",
    swimming: "swimming|beach|water",
    camping: "camping|tent",
    farm: "farm|farmhouse",
    boats: "boat|yacht",
    arctic: "arctic|snow|cold",
    domes: "dome",
  };

  const keyword = categoryKeywords[category.toLowerCase()];

  let filterResults;
  if (category.toLowerCase() === "trending") {
    filterResults = await Listing.find({}).populate("owner").sort({ _id: -1 });
  } else if (keyword) {
    filterResults = await Listing.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).populate("owner");
  } else {
    filterResults = [];
  }

  res.json({ listings: filterResults });
};
