import JWT from "jsonwebtoken";
import createError from "../utlis/createError.js";
export const verifyToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(createError(401, "You are not authenticated"));
  JWT.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, "Token is Not Valid!"));
    req.userId = payload._id;
    req.isSeller = payload.isSeller;
    next();
  });
};
