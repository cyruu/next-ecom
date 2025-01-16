import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
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
    country: {
      type: String,
    },
    total: {
      type: Number,
    },
    orderitems: {
      type: Array,
    },
    paymentmethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "none",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
