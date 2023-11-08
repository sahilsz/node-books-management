import mongoose from "mongoose";

async function connect() {
  const URI = process.env.MONGO_URI;

  try {
    await mongoose.connect(URI);
    console.log("Sucessfully connected to the database");
  } catch (err) {
    console.log("Could not connect to DB");
    process.exit(1);
  }
}

export default connect;
