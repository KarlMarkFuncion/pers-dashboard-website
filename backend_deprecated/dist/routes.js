"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _controllers = require("../controllers/controllers");
var routes = function routes(app) {
  app.route("/getHeartrateById/:id").get(_controllers.getHeartrateById);
  app.route("/getOxidationById/:id").get(_controllers.getOxidationById);
  app.route("/getUserById/:id").get(_controllers.getUserById);
  app.route("/getPatientById/:id").get(_controllers.getPatientById);
  app.route("/add_new_user").post(addNewUser);
  app.route("/get_user_login/:email/:password").get(getUserLogin);
};
var _default = exports["default"] = routes;