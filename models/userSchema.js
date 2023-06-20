import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cpassword: String,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  contact: {
    number: String,
  },
  address: {
    country: String,
    streetaddress: String,
    city: String,
    state: String,
    pincode: String,
  },
  // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: CourseDetails }],
  //ratings
  //cart
  //admin..list items
});

//hashing the password

userSchema.pre("save", async function (next) {
  console.log("bcrypted");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//generating token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

var UserDetails = mongoose.model("UserDetails", userSchema);

export default UserDetails;
