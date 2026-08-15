import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Database Connected");

    return mongoose.connection;
  } catch (error) {
    console.error("Database is Not Connected");
    console.error(error);

    throw error;
  }
};

export default dbConnect;
