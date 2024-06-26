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
      default:
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1713916800&semt=ais",
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    skills: { type: [], default: false },
    favorties: [],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};
UserSchema.methods.gitSingnedToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      isSeller: this.isSeller,
      img: this.img,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET
  );
};
export default mongoose.model("User", UserSchema);
