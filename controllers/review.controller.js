import createError from "../utlis/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

const createReview = async (req, res, next) => {
  const { gigId, desc, star } = req.body;
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    gigId,
    desc,
    star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
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
const deleteReview = async (req, res, next) => {};
// const deleteReview = async (req, res, next) => {
//   try {
//     const gigId = req.params.id;
//     console.log(gigId)
//     // Check if review exists
//     const review = await Review.findById(gigId);
//     if (!review) {
//       return next(createError(404, "Review not found"));
//     }
//     console.log("reqUserId", req.userId);
//     if (req.userId !== review.userId) {
//       return next(createError(403, "Unauthorized to delete review"));
//     }

//     // Delete the review
//     await Review.findByIdAndDelete(reviewId);

//     // Update Gig model (assuming reviews affect gig rating)
//     await Gig.findByIdAndUpdate(review.gigId, {
//       $inc: { totalStars: -review.star, starNumber: -1 },
//     });

//     res.status(200).json({ message: "Review deleted successfully" });
//   } catch (err) {
//     next(createError(500, "Failed to delete review"));
//   }
// };
export { createReview, getReviews, deleteReview };
