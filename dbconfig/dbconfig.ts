import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Make sure MongoDB is running. " + err
      );
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
