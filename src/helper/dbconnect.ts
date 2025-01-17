import mongoose from "mongoose";

let isConnected = false; // Flag to prevent multiple connections

export async function dbconnect() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const conn = mongoose.connection;

    // Attach listeners only once
    conn.once("connected", () => {
      console.log("Connected to MongoDB");
    });

    conn.once("error", (error) => {
      console.log("Failed to connect", error);
    });

    isConnected = true; // Mark as connected
  } catch (error) {
    console.log("Connection error:", error);
  }
}
