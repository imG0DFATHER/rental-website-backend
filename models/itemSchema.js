import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ratePerDay: {
    type: Number,
    required: true,
  },
  ratePerWeek: {
    type: Number,
    required: true,
  },
  ratePerMonth: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  securityMoney: {
    type: Number,
    required: true,
  },
  user_Id: {
    type: String,
    required: true,
  },
});

var itemDetails = mongoose.model("ItemDetails", itemSchema);

export default itemDetails;
