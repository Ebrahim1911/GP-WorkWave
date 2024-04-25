import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    img: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: [true, "Please provide country"],
    },
    phone: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};
UserSchema.methods.gitSingnedToken = function () {
  return JWT.sign(
    { _id: this._id, isSeller: this.isSeller },
    process.env.JWT_SECRET
  );
};
export default mongoose.model("User", UserSchema);
