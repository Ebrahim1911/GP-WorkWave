import catSchema from "../models/cat.model.js";
export const getAllCategories = async (req, res) => {
  try {
    const allCategory = await catSchema.find();
    if (allCategory.length === 0)
      return res
        .status(200)
        .json({ data: { message: "There is No Category to Show" } });
    res.status(200).json(allCategory);
  } catch (err) {
    return next(createError(500, "There is No Category to Show"));
  }
};
