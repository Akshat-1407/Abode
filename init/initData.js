if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const { faker } = require('@faker-js/faker');

const Url = process.env.ATLASDB_URL;

// MongoDB Connection
main()
  .then(() => {
    console.log("Sucessful Connection to DB...");
  })
  .catch((err) => {
    console.err(err);
  });

async function main() {
  await mongoose.connect(Url);
}

const NUM_USERS = 6;
const NUM_LISTINGS = 30;
const REVIEWS_PER_LISTING = 9;

const sampleImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=800&q=60"
];

const realLocations = [
  { city: "Bali", country: "Indonesia" },
  { city: "Paris", country: "France" },
  { city: "Tokyo", country: "Japan" },
  { city: "Barcelona", country: "Spain" },
  { city: "New York", country: "USA" },
  { city: "London", country: "United Kingdom" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Rome", country: "Italy" },
  { city: "Bangkok", country: "Thailand" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Sydney", country: "Australia" },
  { city: "Singapore", country: "Singapore" },
  { city: "Venice", country: "Italy" },
  { city: "Kyoto", country: "Japan" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Prague", country: "Czech Republic" },
  { city: "Berlin", country: "Germany" },
  { city: "Mexico City", country: "Mexico" },
  { city: "Barcelona", country: "Spain" },
  { city: "Bangkok", country: "Thailand" },
  { city: "Seoul", country: "South Korea" },
  { city: "Vancouver", country: "Canada" },
  { city: "Lisbon", country: "Portugal" },
  { city: "Vienna", country: "Austria" },
  { city: "Florence", country: "Italy" },
  { city: "Barcelona", country: "Spain" },
  { city: "Marrakech", country: "Morocco" },
  { city: "Chiang Mai", country: "Thailand" },
  { city: "Reykjavik", country: "Iceland" },
  { city: "Miami", country: "USA" }
];

const listingTypes = [
  { type: "Mountain Retreat", desc: "Nestled high in the mountains, this retreat offers a serene getaway with breathtaking panoramic mountain views. Enjoy scenic mountain hiking trails, fresh air, and mountain tranquility. Perfect for mountain lovers seeking mountains and nature's serenity." },
  { type: "Beach House", desc: "Wake up to ocean waves and golden sunrise. This beachfront escape offers direct beach access, perfect for swimming, sunbathing, and water activities. Enjoy beaches, sandy shores, and the ultimate swimming beach experience." },
  { type: "City Apartment", desc: "Located in the city with stylish rooms and all amenities. Each spacious room is thoughtfully designed. Walk to cafes, galleries, and landmarks. Experience comfort in beautifully appointed rooms for your stay." },
  { type: "Countryside Farmhouse", desc: "Escape to a charming farmhouse surrounded by rolling fields. Experience life on a working farm with fresh farmhouse produce. Cozy farmhouse rustic decor and peaceful surroundings for a perfect farmhouse getaway and farm experience." },
  { type: "Lake Cabin", desc: "A rustic cabin on a beautiful lake shore. Enjoy water activities like fishing, canoeing, and water sports. Perfect for water lovers who cherish peaceful water-side surroundings, swimming opportunities, and water relaxation." },
  { type: "Historic Castle", desc: "Step into history in this majestic castle with grand halls and castle architecture. Featuring antique furnishings and sweeping castle views. Experience the magic of stone castle walls and regal castle elegance." },
  { type: "Desert Camp", desc: "Venture into the desert with our luxury camping tent experience. Stay in comfortable camping tents, savor local cuisine, and gaze at star-filled skies. Ideal for camping and tent enthusiasts seeking authentic camping adventures." },
  { type: "Snow Chalet", desc: "A warm wooden chalet nestled in a winter wonderland surrounded by arctic snow. Unwind by the fireplace after skiing. Enjoy arctic snowy landscapes and ski-in/ski-out snow convenience in this arctic setting." },
  { type: "Jungle Lodge", desc: "Experience an iconic stay in this legendary iconic landmark property. This iconic architectural gem offers historic charm and iconic cultural significance. A true iconic destination for travelers seeking iconic unforgettable experiences." },
  { type: "Island Bungalow", desc: "Experience paradise in a tropical island bungalow with beautiful sandy beaches. Lounge on white sandy beaches, swim in crystal-clear waters, and enjoy swimming in paradise for the ultimate swimming beach vacation." },
  { type: "Treehouse", desc: "Perched in nature with luxury camping amenities and stunning views. Enjoy comfortable tented accommodations and camping experiences. Perfect glamorous camping with luxury and camping immersion in nature." },
  { type: "Boathouse", desc: "Wake up by gentle waves in this charming boat house on the water. Enjoy peaceful water-side mornings watching boats drift by. This boat retreat offers a unique boat-living and water escape experience." },
  { type: "Arctic Igloo", desc: "Experience the frozen arctic north in a warm glass igloo surrounded by arctic snow and ice. Sleep under northern lights in this arctic wonderland. Arctic glass igloo with arctic interiors and stunning arctic views." },
  { type: "Urban Loft", desc: "A sleek hotel in a dynamic cityscape featuring modern rooms with city views. Each room is elegantly designed with comfortable amenities. Walk to galleries, venues, and restaurants. Perfect for room-conscious city travelers." },
  { type: "Safari Tent", desc: "Stay in luxury camping tents amid the savannah with wildlife. Wake to wildlife sights and enjoy open-air camping dining with breathtaking sunsets. This tented camping combines adventure with tent elegance and camping luxury." },
  { type: "Vineyard Villa", desc: "Surrounded by rolling vineyards with stunning water views and wine country charm. Savor local vintages, enjoy picturesque water-side views, and unwind in luxurious accommodations for water and wine lovers." },
  { type: "Cave Home", desc: "A charming cottage featuring private room accommodations in a unique cave setting. Warm interiors with comfortable rooms create a cozy atmosphere. A fascinating escape for those seeking private room luxury and comfort." },
  { type: "Dome House", desc: "A futuristic dome-shaped home offering panoramic views in innovative dome architecture. This unique dome provides an eco-friendly dome experience. Perfect for stargazing and enjoying open-concept dome living with dome views." },
  { type: "Tiny Home", desc: "Nestled in the mountains, this cozy lodge offers stunning mountain vistas and mountain adventures. Enjoy mountain hiking trails, fresh mountain air, and comfortable mountain accommodations for mountain enthusiasts." },
  { type: "Eco Lodge", desc: "Sustainability meets adventure in this eco-friendly camping ground designed harmoniously. Enjoy camping in designated areas, campfires, and green camping initiatives. Ideal for eco-camping seekers and conscious camping travelers." },
  { type: "Luxury Penthouse", desc: "Experience urban elegance in this stunning penthouse with floor-to-ceiling windows and city skyline views. Modern furnishings, premium amenities, and breathtaking vistas create the ultimate urban escape for discerning travelers." },
  { type: "Garden Villa", desc: "A serene villa surrounded by lush gardens and tropical plants. Enjoy peaceful garden walks, outdoor dining, and natural beauty at every turn. Perfect for those seeking tranquility and botanical beauty in a luxurious garden setting." },
  { type: "Beachfront Resort", desc: "An all-inclusive beachfront paradise with direct ocean access and spectacular sunsets. Enjoy water sports, beach bars, and pristine sandy shores. This resort combines relaxation and adventure for the ultimate beach vacation experience." },
  { type: "Mountain Lodge", desc: "A cozy mountain lodge with fireplace, mountain views, and rustic charm. Perfect for hiking adventures, mountain exploration, and peaceful mountain retreats. Experience authentic mountain hospitality in this charming lodge." },
  { type: "Historic Manor", desc: "An elegant historic manor home with period architecture and classic charm. Featuring grand staircases, ornate details, and timeless elegance. A sophisticated retreat for those who appreciate historic character and classic style." },
  { type: "Coastal Cottage", desc: "A charming coastal cottage with ocean breezes and seaside charm. Walking distance to beaches, cliffs, and local coastal attractions. Enjoy a peaceful coastal life in this delightful beachside cottage." },
  { type: "Modern Studio", desc: "A sleek, contemporary studio apartment with minimalist design and smart amenities. Perfect for travelers seeking modern comfort with a stylish urban edge. This studio offers efficiency and elegance in equal measure." },
  { type: "Riverside Cabin", desc: "A peaceful cabin nestled along a scenic riverside. Enjoy fishing, kayaking, and riverside picnics. Perfect for nature lovers seeking water access and riverside tranquility in a comfortable cabin setting." },
  { type: "Garden Cottage", desc: "A romantic cottage with private garden, outdoor patio, and natural surroundings. Enjoy morning coffee in your garden and sunset walks. This intimate cottage is perfect for couples seeking peaceful garden retreats." },
  { type: "Hilltop Villa", desc: "An exclusive hilltop villa with panoramic views, infinity pools, and luxury appointments. Perched above the world with stunning vistas. The ultimate luxury retreat for those seeking exclusive hilltop living." }
];

const reviewComments = [
  "Absolutely loved my stay! Highly recommended.",
  "The location was perfect and the host was very helpful.",
  "Clean, comfortable, and exactly as described.",
  "Would definitely come back again!",
  "A unique experience, thank you for hosting us.",
  "The view was stunning and the amenities were great.",
  "Felt like home away from home.",
  "The property exceeded our expectations.",
  "Great value for the price.",
  "A peaceful and relaxing getaway.",
  "The host went above and beyond to make us feel welcome.",
  "Perfect for a family vacation.",
  "The pictures don't do it justice!",
  "Everything was spotless and well maintained.",
  "We enjoyed every moment of our trip.",
  "The neighborhood was quiet and safe.",
  "Check-in was smooth and easy.",
  "The beds were super comfortable.",
  "Would recommend to friends and family.",
  "Can't wait to visit again!",
  "The decor was beautiful and stylish.",
  "Lots of thoughtful touches throughout the property.",
  "Close to great restaurants and shops.",
  "The outdoor space was amazing.",
  "We saw lots of wildlife nearby.",
  "Perfect spot for a romantic getaway.",
  "The kitchen was fully equipped.",
  "Loved the fireplace and cozy atmosphere.",
  "The sunsets were unforgettable.",
  "A truly memorable experience."
];

async function seed() {
  // Clean up
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});

  // Create users
  const userData = [
    { username: "alice", email: "alice@example.com", password: "hello" },
    { username: "bob", email: "bob@example.com", password: "hello" },
    { username: "carol", email: "carol@example.com", password: "hello" },
    { username: "dave", email: "dave@example.com", password: "hello" },
    { username: "eve", email: "eve@example.com", password: "hello" },
    { username: "frank", email: "frank@example.com", password: "hello" }
  ];

  // Register users with passport-local-mongoose
  const users = [];
  for (let data of userData) {
    const user = new User({ username: data.username, email: data.email });
    const registeredUser = await User.register(user, data.password);
    users.push(registeredUser);
  }

  // Create listings
  const listings = [];
  for (let i = 0; i < NUM_LISTINGS; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];
    const typeObj = listingTypes[i % listingTypes.length];
    const location = realLocations[i % realLocations.length];
    const image = sampleImages[i % sampleImages.length]; // Assign images sequentially
    const listing = new Listing({
      title: `${typeObj.type} in ${location.city}`,
      description: `${typeObj.desc}`,
      image: image,
      price: faker.number.int({ min: 500, max: 10000 }),
      location: location.city,
      country: location.country,
      owner: owner._id
    });
    await listing.save();
    listings.push(listing);
  }

  // Create reviews for each listing
  for (let listing of listings) {
    const reviewIds = [];
    // Get reviewers who are not the owner
    const possibleReviewers = users.filter(u => !u._id.equals(listing.owner));
    for (let j = 0; j < REVIEWS_PER_LISTING; j++) {
      if (possibleReviewers.length === 0) break; // Avoid infinite loop
      const reviewer = possibleReviewers[Math.floor(Math.random() * possibleReviewers.length)];
      const review = new Review({
        rating: faker.number.int({ min: 3, max: 5 }),
        comments: faker.helpers.arrayElement(reviewComments),
        author: reviewer._id
      });
      await review.save();
      reviewIds.push(review._id);
    }
    listing.reviews = reviewIds;
    await listing.save();
  }

  console.log("Database seeded with meaningful users, listings, and reviews!");
}

main()
  .then(seed)
  .then(() => mongoose.connection.close());
