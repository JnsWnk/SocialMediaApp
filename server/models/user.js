import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    require: true,
    min: 5,
    max: 50,
    unique: true,
  },
  image: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
