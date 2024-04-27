import mongoose from "mongoose";
const { Schema } = mongoose;

const catSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categories", catSchema);
