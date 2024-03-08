import {
  getHeartrateById,
  getOxidationById,
  getPatientById,
  getUserById,
  addNewUser,
  getUserLogin,
  sensorPayloadProcess
} from "../controllers/controllers";
  
  const routes = (app) => {
    app
      .route("/getHeartrateById")
      .get(getHeartrateById);
   
    app
      .route("/getOxidationById")
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

    app
      .route("/sensor_payload_process")
      .post(sensorPayloadProcess);

};
  
export default routes;