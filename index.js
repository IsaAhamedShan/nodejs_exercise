const express = require("express");
const app = express();
const user = express();
const admin = express(); //defining another express object for admin
app.use("/admin", admin); //here we are saying if anyone req by /admin then we will send the req to admin route
//we can set local variables for server;
app.use("/user", user);
const port = 5000;
app.use(express.json());
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
        id: req.id
    })
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
