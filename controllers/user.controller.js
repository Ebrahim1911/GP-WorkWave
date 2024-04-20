import User from "../models/user.model.js";
import createError from "../utlis/createError.js";
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (req.userId !== userId.toString())
    return next(createError(403, "You can delete only Your account!"));

  await User.findByIdAndDelete(userId);
  res.status(200).json("deleted.");
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
export { deleteUser, getUser };
