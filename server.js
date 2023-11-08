import app from "./app.js";
import dotenv from "dotenv";
import connect from "./database.js";

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  console.log("Listening on port 8080");
  await connect();
});
