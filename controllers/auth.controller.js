import User from "../models/user.model.js";
import createError from "../utlis/createError.js";
const register = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
      // password,
      // isAdmin: false,
    });
    await newUser.save();
    res.status(201).json({ staus: "SUCESS", data: { newUser } });
  } catch (err) {
    handleValidationErrors(err, next);
  }
};
const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "Invaild Email or Password"));
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(createError(400, "Invaild Email or Password"));
    sendToken(user, 200, res);
  } catch (err) {
    return next(createError(500, "SOMETHING WENT WRONG!"));
  }
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

const handleValidationErrors = function (err, next) {
  if (!err || !err.errors) return next(createError(500, "invalid credentials"));
  const validationErrors = {};
  for (const field in err.errors) {
    validationErrors[field] = err.errors[field].message;
  }

  return next(createError(400, { errors: validationErrors }));
};

export { register, logIn };
