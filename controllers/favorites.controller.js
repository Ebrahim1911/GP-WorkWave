import Favorite from "../models/favorites.model.js";
import createError from "../utlis/createError.js";
import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";

let postUserFavorites = async (req, res, next) => {
  let { userId } = req;
  let { gigId } = req.params;
  if (userId) {
    let user = await User.findById(userId);
    const favoriteGig = await Gig.findById(gigId);
    user.favorties.push(favoriteGig);

    await user.save();
    res.json({
      status: "SUCCESS",
      data: {
        favorties: user.favorties,
      },
    });
  } else {
    res.json("Not Found");
  }
};

const getUserFavorites = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);
  res.status(200).json({
    status: "SUCCESS",
    data: {
      userFavorites: user.favorties,
    },
  });
};

const deleteUserFavorites = async (req, res, next) => {
  const { gigId } = req.params;
  const { userId } = req;
  const user = await User.findById(userId);

  user.favorties = user.favorties.filter((item) => item._id != gigId);

  await user.save();

  res.status(200).json({
    status: "SUCCESS",
    data: {
      userFavorites: user.favorties,
    },
  });
};
export { postUserFavorites, getUserFavorites, deleteUserFavorites };
