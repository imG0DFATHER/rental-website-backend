import express from "express";
// import mongoose from "mongoose";
import itemDetails from "../models/itemSchema.js";

const router = express.Router();

export const readItemsByUser = async (req, res) => {
  // const items = await itemDetails.find().limit(1);
  //req._id
  const items = await itemDetails.find({ user_Id: req.body.user_Id });
  // console.log(items);
  console.log("post hi");
  console.log(req.body);
  console.log(items);
  return res.status(200).json({ items });
  //by user, find({user}).select({name:1})
};

export const createItemDetails = async (req, res) => {
  console.log("adding item");
  const {
    itemName,
    category,
    ratePerDay,
    ratePerWeek,
    ratePerMonth,
    about,
    quantity,
    location,
    securityMoney,
    user_Id,
  } = req.body;

  console.log(req.body);
  if (
    !itemName ||
    !category ||
    !ratePerDay ||
    !ratePerWeek ||
    !ratePerMonth ||
    !about ||
    !quantity ||
    !location ||
    !securityMoney ||
    !user_Id
  ) {
    console.log("hii");
    // return res.status(422).json({ error: "Please fill in all fields" });
  }

  try {
    console.log("ja rha");
    const itemExist = await itemDetails.findOne({
      itemName: itemName,
      user_Id: user_Id,
    });
    console.log(itemExist);

    if (itemExist) {
      return res
        .status(422)
        .json({ error: "This item has been already listed by you" });
      // console.log("if exists");
    } else {
      console.log("bye");
      const newitemDetails = new itemDetails({
        itemName,
        category,
        ratePerDay,
        ratePerWeek,
        ratePerMonth,
        about,
        quantity,
        location,
        securityMoney,
        user_Id,
      });
      newitemDetails.save();
      console.log("Item Details added");
      debugger;

      // res.status(201).json({ message: "Item Listed Successfully" });
      // res.send(newitemDetails);
    }
    res.json({ message: "Item created successfully" });
  } catch (error) {
    res.status(401).json({ error: "FAILED" });
  }
};

export const updateItemDetails = async (req, res) => {
  // const item = new mongoose.model("item", itemDetails);
  const {
    itemName,
    category,
    ratePerDay,
    ratePerWeek,
    ratePerMonth,
    about,
    quantity,
    location,
    securityMoney,
    objectId,
  } = req.body;
  console.log("entered");
  try {
    console.log("entered yo");
    // const result = await itemDetails.updateOne({_id},{
    const updatedResult = await itemDetails.findByIdAndUpdate(
      { _id: objectId },
      {
        $set: {
          itemName,
          category,
          ratePerDay,
          ratePerWeek,
          ratePerMonth,
          about,
          quantity,
          location,
          securityMoney,
        },
      },
      {
        new: true,
        useFindandModify: false,
      }
    );
    console.log(updatedResult);
  } catch (error) {
    console.log(error);
  }
};
// updateItemDetails("648f7237bc0fea5d201bf89b");

export const deleteItemDetails = async (req, res) => {
  try {
    const { objectId } = req.body;
    const deletedResult = await itemDetails.findByIdAndDelete({
      _id: objectId,
    });
    console.log(deletedResult);
  } catch (error) {
    console.log(error);
  }
};

export default router;
