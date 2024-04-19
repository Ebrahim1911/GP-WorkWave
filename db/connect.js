import mongoose from "mongoose";
const connectDb = async function () {
  try {
    await mongoose.connect(process.env.MOGOOSE_URL);
    console.log("Connected To MongoDB");
  } catch (err) {
    console.log(err);
  }
};
export default connectDb;
