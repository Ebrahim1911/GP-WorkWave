import User from "../models/user.model.js";
import createError from "../utlis/createError.js";
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  console.log(req.userId, userId);
  if (req.userId !== userId.toString())
    return next(createError(403, "You can delete only Your account!"));

  await User.findByIdAndDelete(userId);
  res.status(200).json("deleted.");
};
export { deleteUser };
