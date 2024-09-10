import { UserModel } from "../models/index.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const user = await UserModel.findOne({ username });

    if (user) return res.status(400).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new UserModel({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({ user:newUser });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check user exist
    const user = await UserModel.findOne({ username });

    // check password correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password or username" });

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({ message: "user logout successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
