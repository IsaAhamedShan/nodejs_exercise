const express = require("express");
const adminRoute = require("./AdminRoute")
const app = express();
const user = express.Router();
const admin = express.Router(); //defining another router object for admin.
//we can define const admin = express() which is a express object but defining
// router object is better choice because its ligther than a new express object,
// we can maintain middle ware better here; 
//user express() for cases where i need completely isolated application instances or 
//microservices within the same codebase.
app.use("/admin", admin); //here we are saying if anyone req by /admin then we will send the req to admin route
//we can set local variables for server;

//we can get any of these express object's path using app.path()/ user.path etc
app.use("/user", user);
app.use("/adminRoute",adminRoute)
const port = 5000;
app.use(express.json());
app.set("view engine", "ejs");
app.locals.name = "isa";
//using user express object
user.get("/details", async (req, res) => {
  res.send("Inside user/details route using user app");
});
//using admin express object
admin.get("/details", async (req, res) => {
  res.send("Inside admin/details route using admin app");
});
//app.all() this route can be called by anything get,put,post,update etc
app.all("/public", (req, res) => {
  res.send("I am accessable by everything.");
});
//app.disable(name) this method is used to disable a app's setting
//app.enable(name) used to enable a app's setting.
//in doc of express inside method app.set() we can see many setting.
app.disable("case sensitive routing");
app.enable("case sensitive routing");
//by default if we call /DETAILS insted of /details express nodejs allows it
// but we can enable or disable it

//app.set(key, value) app.get(key)
//we can set any key value pair and get that value by these two method

//vvi app.param(paramName, callbackFunction(req,res,next,nameToReceiveId)), whenever a
//method is a middleware and  get called where paramName given to app.param() is matched
//the callback function will get called.
app.param("id", (req, res, next, id) => {
  req.id = id; //sets the id to req;

  next();
});
app.get("/learningParams/:id", (req, res) => {
  res.send({
    id: req.id,
  });
});
//here we can use route method to use get post any method where the address is same.
//now i have install ejs using npm i ejs.we can use ejs to return a html page. ejs is easier than pug.
//we have to return that html using res.render. here i put the file name inside the render(filename) method. it will
//check views folder by default
app
  .route("/events")

  .get((req, res) => {
    res.render("index");
  })
  .post((req, res) => {
    res.send({ message: "inside post /events" });
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/simplePost", (req, res) => {
  console.log(req.body);
  let data = req.body;
  res.send({
    data,
    name: app.locals.name,
  });
});

//REQ SECTION OF EXPRESS JS DOCS



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//router section
//for router example we made AdminRoute and imported here.
