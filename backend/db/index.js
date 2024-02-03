const mongoose = require("mongoose");
const { DB_URL } = require("../config/serverConfig");
const { type } = require("os");

mongoose.connect(DB_URL);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    maxLength: 50,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
    unique: true,
    minLength: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    minLength: 8,
    require: true,
  },
});

const orderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  sub_total: {
    type: Number,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("user", userSchema);
const Order = mongoose.model("order", orderSchema);

module.exports = {
  User,
  Order,
};
