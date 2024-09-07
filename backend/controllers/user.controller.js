import { UserModel } from "../models/index.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers)
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
