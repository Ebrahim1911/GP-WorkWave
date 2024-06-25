import { compareSync } from "bcrypt";
import Gig from "../models/gig.model.js";
import Order from "../models/oder.model.js";
import createError from "../utlis/createError.js";
const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    const { _id, userId, price, title, cover } = gig;
    const newOrder = new Order({
      gigId: _id,
      img: cover,
      sellerId: userId,
      buyerId: req.userId,
      payment_intent: "temp",
      title,
      price,
    });
    await newOrder.save();
    res.status(200).json("Order Created");
  } catch (err) {
    return next(createError(500, "Can not Continue this process"));
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      // isCompleted: true,
    });
    res.status(200).json({
      state: "SUCCESS",
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

const geAllOrders = async (req, res, next) => {
  const allOrders = await Order.find();
  res.status(200).json({
    status: "SUCCESS",
    data: {
      allOrders,
    },
  });
};

const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const order = await Order.findById(orderId);

    if (req.isAdmin || req.userId == order.buyerId) {
      await Order.findByIdAndDelete(orderId);
      res.status(200).send("Order has been deleted!");
    } else {
      return next(
        createError(403, "You are not authorized to delete this order!")
      );
    }
  } catch (err) {
    next(err);
  }
};

export { createOrder, getOrders, geAllOrders, deleteOrder };
