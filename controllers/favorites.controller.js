import Favorite from "../models/favorites.model.js";
import createError from "../utlis/createError.js";
const postUserFavorites = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { favorite } = req.body;
    let oldFavorite;
    let user = await Favorite.findOne({ userId });
    console.log(user);
    if (!user) {
      console.log("from new user");
      const newFavorite = new Favorite({ userId, favorite });
      await newFavorite.save();
      res.status(201).json({
        status: "SUCCESS",
        data: {
          newFavorite,
          oldFavorite: null,
        },
      });
    }
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      userId,
      { $push: { favorite: favorite } },
      { new: true }
    );
    console.log("updated", updatedFavorite);
    oldFavorite = user.favorite ? user.favorite[0] : null;
    console.log(user.favorite);
    res.status(200).json({
      status: "SUCCESS",
      data: {
        oldFavorite,
        newFavorite: updatedFavorite,
      },
    });
  } catch (err) {
    next(createError(500, "Favorite Can not be appended"));
  }
};

const getUserFavorites = async (req, res, next) => {
  const { userId } = req;
  console.log(userId);
  const userFavorites = await Favorite.find({ userId });
  res.status(200).json({
    status: "SUCCESS",
    data: {
      userFavorites,
    },
  });
};
export { postUserFavorites, getUserFavorites };
