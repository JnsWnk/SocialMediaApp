import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = new User({
      ...user,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
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
    const userObject = user.toObject();
    delete userObject.password;
    console.log("login: ", email);
    res.status(200).json({ token, user: userObject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
