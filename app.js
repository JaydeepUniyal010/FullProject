if(process.env.NODE_ENV != "production") {
  require ("dotenv").config();
};  

// if(process.env.ATLASDB_URL != "production") {
//   require ("dotenv").config();
// };

//console.log(process.env.ATLASDB_URL);
//onsole.log(process.env.CLOUD_API_SECRET);

const express = require("express"); //connect express
const app = express();
const mongoose = require("mongoose"); //connect database
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require ("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL; //mongodb connection database
const port = process.env.PORT || 4000;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs"); //path for ejs routes
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //parse for incoming req data
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public"))); //serve static files
app.use(cookieParser());

const store =MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter:24*3600, //for lazy update; 
});

store.on("error", (err) => {
  console.log("ERROR IN MONGO SESSION STORE",err);
  });
 
const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: {
    expires: Date.now() +  7* 24 * 60 * 60 *1000,
    maxAge: 7* 24 * 60 * 60 *1000,
    httpOnly: true, 
  }
}; 

// app.get("/", (req, res) => { //create a API
//   res.send("Hi, I am root");
// });




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate(User.authenticate())));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)  => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async (req,res) =>{
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "web-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
//   });

  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewsRouter); //parent route
  app.use("/", userRouter); //parent route

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res, next) =>{
  let { statusCode=500, message= "Something went wrong" } = err;
  // res.status(statusCode).send({msg:message});
  res.status(statusCode).render("error.ejs", {err});
  next();
});

app.listen(port, () => {
  console.log("server is listening to port 8000");
});
