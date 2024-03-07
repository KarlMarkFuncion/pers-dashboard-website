import {
  getHeartrateById,
  getOxidationById,
  getPatientById,
  getUserById
} from "../controllers/controllers";
  
  const routes = (app) => {
    app
      .route("/getHeartrateById/:id")
      .get(getHeartrateById);
   
    app
      .route("/getOxidationById/:id")
      .get(getOxidationById);

    app
      .route("/getUserById/:id")
      .get(getUserById);

    app
      .route("/getPatientById/:id")
      .get(getPatientById) 

    app
      .route("/add_new_user") 
      .post(addNewUser);

    app
      .route("/get_user_login/:email/:password")
      .get(getUserLogin);
  };
  
  export default routes;