const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    validate: {
      validator: function (value) {
        return !/[^a-zA-Z0-9]+/.test(value);
      },
      message: "Username should not contain special characters.",
    },
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    // unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    validate: {
      validator: function (value) {
        return !/^(?=.[a-zA-Z])(?=.[0-9])(?=.*[!@#$%^&*])/g.test(value);
      },
      message:
        "Password should contain at least 1 letter, 1 number and 1 special character.",
    },
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  products: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Users", userSchema);
