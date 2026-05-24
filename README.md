# Abode - Unique Stays & Experiences

A full-stack web application for discovering and booking unique stays around the world, inspired by Airbnb. Browse properties by category, search in real-time, and connect with hosts to find your perfect destination.

## 🌟 Features

- **Dynamic Search** - Real-time search filtering across title, description, location, and country
- **Category Browsing** - 11 curated categories (Trending, Mountains, Swimming, Rooms, Castles, Camping, Boats, Farm, Arctic, Domes, Iconic)
- **Responsive Design** - Mobile-friendly interface with Bootstrap 5
- **User Authentication** - Secure login/signup with Passport.js and bcrypt password hashing
- **Listing Management** - Create, edit, and delete property listings
- **Reviews & Ratings** - Users can leave reviews with ratings for stays
- **Featured Destinations** - Dynamic hero section showcasing top listings
- **Session Management** - Persistent sessions with MongoDB store
- **Input Validation** - Joi schema validation for data integrity

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js (v5.1.0)
- MongoDB (Local database at mongodb://127.0.0.1:27017/wanderlust)
- Mongoose (ODM for MongoDB)
- Passport.js + passport-local-mongoose (Authentication)
- express-session & connect-mongo (Session management)
- Joi (Input validation)

**Frontend:**
- EJS with ejs-mate (Template engine)
- Bootstrap 5.3.5 (CSS framework)
- Font Awesome 6.7.2 (Icons)
- Vanilla JavaScript (Dynamic search & filters)

**Development Tools:**
- Faker.js (Test data generation)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "AirBnb Clone"
```

2. **Install dependencies**
```bash
npm install
```

3. **Ensure MongoDB is running**
```bash
# Make sure MongoDB is running at localhost:27017
mongod
```

4. **Seed the database** (Optional - populates with test data)
```bash
cd init
node initData.js
cd ..
```

5. **Start the application**
```bash
node app.js
```

6. **Access the application**
- Open browser and navigate to `http://localhost:8080`

## 🚀 Usage

### For Guests
1. Visit the home page to explore categories or use the search bar
2. Browse listings in the Explore Stays section
3. Sign up or log in to book stays and leave reviews
4. Search and filter by category to find your perfect destination

### For Hosts
1. Sign up for an account
2. Click "List Your Space" in the navbar
3. Fill in property details and upload images
4. Manage your listings and view guest reviews

### Search & Filter
- **Real-time Search**: Type in the navbar search bar for instant results
- **Category Filters**: Click category chips to browse specific types of stays
- **Featured Section**: View curated listings on the home page

## 📁 Project Structure

```
AirBnb Clone/
├── app.js                 # Main Express application
├── middleware.js          # Authentication & validation middleware
├── schema.js             # Joi validation schemas
├── package.json          # Dependencies
├── init/
│   └── initData.js       # Database seeding script
├── models/
│   ├── listing.js        # Listing schema & model
│   ├── review.js         # Review schema & model
│   └── user.js           # User schema & model (with Passport)
├── routes/
│   ├── listing.js        # Listing CRUD & search/filter routes
│   ├── review.js         # Review routes
│   └── user.js           # Authentication routes
├── utils/
│   ├── expressError.js   # Custom error class
│   └── wrapAsync.js      # Async error handler wrapper
├── views/
│   ├── home.ejs          # Landing page
│   ├── error.ejs         # Error page
│   ├── layouts/
│   │   └── boilerplate.ejs  # Master template
│   ├── includes/
│   │   ├── navbar.ejs    # Navigation bar
│   │   ├── footer.ejs    # Footer
│   │   └── flash.ejs     # Flash messages
│   ├── listings/
│   │   ├── index.ejs     # All listings view
│   │   ├── show.ejs      # Single listing detail
│   │   ├── new.ejs       # Create listing form
│   │   └── edit.ejs      # Edit listing form
│   └── users/
│       ├── signup.ejs    # Sign up form
│       └── login.ejs     # Login form
└── public/
    └── css/
        ├── style.css     # Main stylesheet
        └── rating.css    # Rating component styles
```

## 🔑 Key Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `GET /listings/search/api` - API search endpoint (JSON)
- `GET /listings/filter/api` - API filter endpoint (JSON)

### Users
- `GET /signup` - Sign up page
- `POST /signup` - Register user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🎨 Features in Detail

### Real-Time Search
- Search updates as you type in the navbar
- Results filter across title, description, location, and country
- Case-insensitive matching

### Category Filtering
- 11 curated categories with keyword matching
- Trending shows latest listings
- Each category has a dedicated icon

### Authentication
- Secure password hashing with bcrypt
- Session-based authentication
- Role-based access control (owner checks for edit/delete)

### Data Validation
- Client-side form validation
- Server-side Joi schema validation
- Custom error handling

## 📊 Database Schema

### Listing
```javascript
{
  title: String,
  description: String,
  image: String (URL),
  price: Number,
  location: String,
  country: String,
  owner: ObjectId (User reference),
  reviews: [ObjectId] (Review references),
  createdAt: Date
}
```

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed by passport-local-mongoose),
  createdAt: Date
}
```

### Review
```javascript
{
  rating: Number (1-5),
  comments: String,
  author: ObjectId (User reference),
  createdAt: Date
}
```

## 🧪 Testing

To seed the database with test data:
```bash
cd init
node initData.js
```

This creates:
- 20 unique listings with diverse categories
- 6 test users (username: any of the users, password: "hello")
- 9 reviews per listing with ratings

## 🎯 Future Enhancements

- [ ] Booking/reservation system
- [ ] Payment integration (Stripe/Razorpay)
- [ ] User profile dashboard
- [ ] Wishlist/favorites functionality
- [ ] Advanced filtering (price range, ratings)
- [ ] Messaging between hosts and guests
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics & trending data
- [ ] Social media integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a full-stack learning project to demonstrate modern web development practices.

## 📧 Contact & Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Node.js, Express, and MongoDB**
