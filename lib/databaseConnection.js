import mongoose, { connection, Promise } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    connection: null,
    Promise: null,
  };
}

export const connectDB = async () => {
  if (cached.connection) return cached.connection;
  if (cached.Promise) {
    cached.Promise = mongoose.connect(MONGODB_URL, {
      dbName: "YT-E-COMMERCE-NEXT-PROJECT",
      bufferCommands: false,
    });
  }

  cached.connection = await cached.Promise;
  return cached.connection;
};
