import mongoose from "mongoose";

const ProfileDataSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProfileData =
  mongoose.models.ProfileData ||
  mongoose.model("ProfileData", ProfileDataSchema);

export default ProfileData;
