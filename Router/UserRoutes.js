const {
  CreateUser,
  LoginUser,
  UpdateUser,
  DeleteUser,
} = require("../Controller/UserController");

const UserRouter = require("express").Router();
UserRouter.post("/", CreateUser);
UserRouter.get("/", LoginUser);
UserRouter.patch("/", UpdateUser);
UserRouter.delete("/", DeleteUser);
module.exports = UserRouter;
