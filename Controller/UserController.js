const jwt = require("jsonwebtoken");
const Users = require("../Model/UserModal");
const bcrypt = require("bcryptjs");

const CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const products = req.body.products || [];
    const cart = req.body.cart || [];
    const hashedPassword = await bcrypt.hash(password, 10);
    const UserCreated = await Users.create({
      email: email,
      password: hashedPassword,
      username: username,
      products: products,
      cart: cart,
    });
    const token = jwt.sign(
      {
        email: UserCreated.email,
        password: UserCreated.password,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    res
      .status(201)
      .send({ Message: "User Created Successfully !", UserCreated , token});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Email does not exist" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: "Password does not match" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    res.status(200).send({ Message: "Login Successful", token, user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "Not authorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    const user = await Users.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    const { products, cart } = req.body;
    if (products) {
      user.products = products;
    }
    if (cart) {
      user.cart = cart;
    }
    await user.save();
    return res.status(200).send({ Message: "User updated successfully", user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "Not authorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await Users.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).send({ error: "Not authorized" });
    }
    const deletedUser = await Users.findByIdAndDelete(user._id);
    if (!deletedUser) {
      return res.status(404).send({ error: "No user found with given ID" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { CreateUser, LoginUser, UpdateUser, DeleteUser };
