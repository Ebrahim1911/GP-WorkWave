import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please Provide a title"],
      minlength: [4, "Min-length must be at least 4"],
      maxlength: [30, "Max-length must be less than 30"],
    },
    desc: {
      type: String,
      required: [true, "Please Provide a Description"],
      minlength: [40, "Min-length must be at least 40"],
      maxlength: [200, "Max-length must be less than 200"],
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: [true, "Please Provide a Category"],
    },
    price: {
      type: Number,
      required: [true, "Please Provide a Price"],
    },
    cover: {
      type: String,
      // required: true,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: [true, "Please Provide a Short Title"],
      minlength: [4, "Min-length must be at least 4"],
      maxlength: [30, "Max-length must be less than 30"],
    },
    shortDesc: {
      type: String,
      required: [true, "Please Provide a Short Desc"],
      minlength: [4, "Min-length must be at least 4"],
      maxlength: [30, "Max-length must be less than 30"],
    },
    deliveryTime: {
      type: Number,
      required: [true, "Please Provide a delivery Time"],
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    reviews: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
