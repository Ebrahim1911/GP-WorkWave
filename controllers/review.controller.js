import createError from "../utlis/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

const createReview = async (req, res, next) => {
  const { gigId, desc, star } = req.body;
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  try {
    const review = await Review.findOne({ gigId, userId: req.userId });
    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    const newReview = new Review({
      userId: req.userId,
      gigId,
      desc,
      star,
      img: req.img,
      username: req.username,
    });
    const savedReview = await newReview.save();

    const gig = await Gig.findById(gigId);

    if (gig && savedReview) {
      const updatedGig = await Gig.findOneAndUpdate(
        { _id: gigId },
        {
          $push: { reviews: savedReview },
          $inc: { totalStars: star, starNumber: 1 },
        },
        { new: true }
      );

      if (!updatedGig) {
        throw createError(404, "Gig not found");
      }
    }

    res.status(201).send({
      state: "SUCCESS",
      data: {
        savedReview,
      },
    });
  } catch (err) {
    next(createError(500, "Review Can not be created"));
  }
};

const getReviews = async (req, res, next) => {
  try {
    const gigId = req.params.gigId;
    const reviews = await Review.find({ gigId });
    if (reviews.length === 0)
      return res
        .status(200)
        .json({ data: { message: "There Is no Reviews to show" } });
    res.status(200).json(reviews);
  } catch (err) {
    return next(createError(500, "Review Can not be get"));
  }
};
export { createReview, getReviews };
