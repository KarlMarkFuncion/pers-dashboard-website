import {
    addNewListing,
    addNewBooking,
    getListing,
    getListingById,
    addNewUser,
    // validateEmail,
    getUserLogin,
  } from "../controllers/controllers";
  
  const routes = (app) => {
    app
      .route("/")
      // GET Req
      .get(getListing);
  
    app
      .route("/add_listing")
      // POST endpoint
      .post(addNewListing);
  
    app.route("/upload").post();
  
    // NEEDS DEBUGGING
    // app.post("/validate_email", validateEmail);
  
    app
      .route("/add_new_user")
      // add new user POST endpoint
      .post(addNewUser);
  
    app
      .route("/get_user_login/:email/:password")
      // get user GET endpoint
      .get(getUserLogin);
  
    app
      .route("/find_listing/:id")
      // Gets lisitng by id
      .get(getListingById);
  
    app
      .route("/add_booking")
      //adds  booking data (with payment method)
      .post(addNewBooking);
    app
      .route("/confirm_booking")
      //adds  booking data (with payment method)
      .post();
  };
  
  export default routes;