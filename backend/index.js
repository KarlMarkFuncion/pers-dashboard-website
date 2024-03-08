import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import  routes  from "./routes/routes";

//allows env file to be accessed
require('dotenv').config();

console.log(process.env.PORT_VALUE);
const PORT = process.env.PORT_VALUE || 4000;

const app = express();
 
mongoose.connect(process.env.DB_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
// cors setup
app.use(cors());

//bodyparser setup

app.use(bodyParser.json({ limit: "10mb" }));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get("/", (req, res) => {
  res.send(`The app is running at ${PORT}`);
});
 

app.listen(PORT, () => {
  console.log(`the backend server is running at PORT ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;