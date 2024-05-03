import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    gigId: {
      type: String,
      // required: true,
      required: false,
    },
    userId: {
      type: String,
      // required: true,
      required: false,
    },
    star: {
      type: Number,
      // required: true,
      required: false,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      // required: true,
      required: false,
    },
    img: {
      type: String,
      // required: true,
      required: false,
    },
    username: {
      type: String,
      // required: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
