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
  bio: {
    type: String,
    default: "",
    max: 500,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfilePicture",
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
