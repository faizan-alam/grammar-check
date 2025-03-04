import mongoose from "mongoose";

const connectionDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.log("🚀 ~ connectionDatabase ~ error:", error);
  }
};

export default connectionDatabase;
