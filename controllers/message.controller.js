import createError from "../utlis/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.Model.js";

const createMessage = async (req, res, next) => {
  const { conversationId, desc } = req.body;
  const newMessage = new Message({
    conversationId,
    userId: req.userId,
    desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: desc,
        },
      },
      { new: true }
    );

    res.status(201).json({
      status: "SUCCESS",
      data: {
        savedMessage,
      },
    });
  } catch (err) {
    return next(500, createError("An Error Occure...Please Try Again"));
  }
};
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
export { createMessage, getMessages };
