import Gig from "../models/gig.model.js";
import createError from "../utlis/createError.js";
const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new Gig({
    ...req.body,
    userId: req.userId,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
const deleteGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    const gig = await Gig.findById(gigId);
    if (gig.userId !== req.userId)
      return next(createError(403, "You Can delete Only Your gig! "));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

export { createGig, deleteGig, getGig, getGigs };
