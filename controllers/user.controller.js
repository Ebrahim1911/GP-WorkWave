import User from "../models/user.model.js";
import Gigs from "../models/gig.model.js";
import createError from "../utlis/createError.js";

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (req.isAdmin == true || req.userId === userId.toString()) {
    await User.findByIdAndDelete(userId);
    await Gigs.deleteMany({ userId });
    res.status(200).json("deleted.");
  } else if (req.userId !== userId.toString()) {
    return next(createError(403, "You can delete only Your account!"));
  }
};

const getUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  res.status(200).json({
    status: "SUCCESS",
    data: {
      user,
    },
  });
};
const geAllUsers = async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: "SUCCESS",
    data: {
      allUsers,
    },
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.gitSingnedToken();
  res.status(statusCode).json({
    success: true,
    data: {
      user,
      token,
    },
  });
};

const changeUserRole = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "Invaild Email or Password"));
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(createError(400, "Invaild Email or Password"));
    user.isSeller = true;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    return next(createError(500, "SOMETHING WENT WRONG!"));
  }
};
export { deleteUser, getUser, geAllUsers, changeUserRole };
