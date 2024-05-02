import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/connect.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import gigRoute from "./routes/gig.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import caregoriesRoute from "./routes/cat.route.js";
import favoritesRoute from "./routes/favorites.route.js";
const app = express();
app.use(cors({ origin: "http://localhost:5174" }));
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5120;
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/categories", caregoriesRoute);
app.use("/api/favorites", favoritesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went Wrong!";
  return res.status(errorStatus).json(errorMessage);
});
app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: "error", message: "This resource is not available" });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server Listen on PORT ${PORT} `);
});
