import User from "../models/user.js";
import ProfilePicture from "../models/profilePicture.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newProfilePicture = new ProfilePicture({ image: user.image });
    const savedPP = await newProfilePicture.save();

    const newUser = new User({
      ...user,
      password: passwordHash,
      imageId: savedPP._id,
      image: "",
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User does not exist." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const image = await ProfilePicture.findById(user.imageId);
    const userObject = user.toObject();
    delete userObject.password;
    userObject.image = image.image;
    res.status(200).json({ token, user: userObject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfilePicture = async (req, res) => {
  try {
    const imgId = req.body;
    const pp = await ProfilePicture.findOne({ _id: imgId });
    if (!pp) res.status(404).json("Image doesnt exist");
    res.send(200).json(pp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const userObject = user.toObject();
    delete userObject.password;
    const image = await ProfilePicture.findById(user.imageId);
    user.image = image.image;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const follow = async (req, res) => {
  try {
    const { selfId, followId } = req.body;
    const user = await User.findById(selfId);
    const followUser = await User.findById(followId);

    if (!user || !followUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.friends.some((friend) => friend.equals(followId));

    if (following) {
      user.friends = user.friends.filter((friend) => !friend.equals(followId));
    } else {
      user.friends.push(followId);
    }
    const savedUser = await user.save();
    res.status(200).json({ friends: savedUser.friends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
