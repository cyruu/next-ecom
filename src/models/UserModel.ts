import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"], // Uncomment and add validation if needed
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"], // Uncomment and add validation if needed
    },
    email: {
      type: String,
      required: [true, "Please provide an email"], // Uncomment and add validation if needed
      unique: true,
    },
    isadmin:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

// Define the User model (with capitalization)
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
