import Gig from "../models/gig.model.js";

import createError from "../utlis/createError.js";
const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new Gig({
    ...req.body,
    userId: req.userId,
    ownerImg: req.img,
    ownerName: req.username,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    console.log(err);
    handleValidationErrors(err, next);
  }
};
const deleteGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    const gig = await Gig.findById(gigId);
    if (req.isAdmin == true || req.userId === gig.userId.toString()) {
      await Gig.findByIdAndDelete(req.params.id);
      res.status(200).send("Gig has been deleted!");
    } else if ((req.userId !== req.userId) === gig.userId.toString()) {
      return next(createError(403, "You can delete only Your gigs!"));
    }
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
const getSellerGigs = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const isAdmin = req.isAdmin;
  console.log(
    "---------------------------------------------------------------------------------------------------------------->",
    isAdmin
  );
  res.json("end");
};
const handleValidationErrors = function (err, next) {
  if (!err || !err.errors) return next(createError(500, "invalid credentials"));
  const validationErrors = {};
  for (const field in err.errors) {
    validationErrors[field] = err.errors[field].message;
  }

  return next(createError(400, { errors: validationErrors }));
};

export { createGig, deleteGig, getGig, getGigs, getSellerGigs };
