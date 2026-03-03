import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    connection: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    // 👈 YAHAN ! lagana zaroori hai
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "YT-E-COMMERCE-NEXT-PROJECT",
      bufferCommands: false,
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
};
