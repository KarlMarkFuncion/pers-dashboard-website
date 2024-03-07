"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = require("./routes/routes");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var app = (0, _express["default"])();
var PORT = 4000;

// mongo connection via mongoose
_mongoose["default"].Promise = global.Promise;
_mongoose["default"].connect("mongodb://127.0.0.1:27017/pinoy_pers", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// cors setup
app.use((0, _cors["default"])());

//bodyparser setup

app.use(_bodyParser["default"].json({
  limit: "10mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "10mb",
  extended: true
}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(_bodyParser["default"].json());
(0, _routes.routes)(app);
app.get("/", function (req, res) {
  res.send("The app is running at ".concat(PORT));
});
app.listen(PORT, function () {
  console.log("the backend server is running at PORT ".concat(PORT));
});