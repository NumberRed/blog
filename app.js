// api requirements
var express             = require("express"),
    app                 = express(),
    methodOverride      = require("method-override"),
	mongoose            = require("mongoose"),
	passport			= require("passport"),
	moment				= require("moment"),
	flash				= require("connect-flash"),
	LocalStrategy		= require("passport-local"),
    bodyParser          = require("body-parser"),
	expressSanitizer    = require("express-sanitizer"),
	// models requirements
	User				= require("./models/users"),
	Post                = require("./models/posts"),
	Comment				= require("./models/comments")

// routes requirements
var commentRoutes 		= require("./routes/comments"),
	postsRoutes 		= require("./routes/posts"),
	authRoutes 			= require("./routes/auth")

// app uses for different apis, mongoose.set to combat errors
mongoose.set('useFindAndModify', false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// saves log-in for session
app.use(require("express-session")({
	secret: "Secret",
	resave: false,
	saveUninitialized: false
}));

app.use(function(req, res, next) {
	res.locals.currentUser 	= req.user;
	res.locals.error 		= req.flash("error");
	res.locals.success 		= req.flash("success");
	next();
});

// user authorization for login
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// api for time
app.locals.moment = moment;

// app.use for routes
app.use(authRoutes);
app.use(commentRoutes);
app.use(postsRoutes);

// port for hosting
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server started")
});