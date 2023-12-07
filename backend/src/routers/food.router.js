import { Router } from "express";
import { FoodModel } from "../models/food.model.js";
import handler from "express-async-handler";

const router = Router();
//Add Food
router.post("/", async (req, res) => {
  const { name, price, image } = req.body;
  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "",
      });
      if (uploadRes) {
        const foods = new Foods({
          name,
          price,
          image: uploasRes,
        });

        const saveFoods = await foods.save();
        res.status(200).send(saveFoods);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET ALL FOOD ITEM

router.get("/", async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.send(foods);
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);
router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

//GET FOOD ITEM

router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

router.delete("/:foodId", async (req, res) => {
  try {
    const foods = await Foods.findById(req.params._id);
    if (!foods) return res.status(404).send("Food Item not found...");

    if (foods.image.public_id) {
      const destroyResponse = await cloudinary.uploader.destroy(
        foods.image.public_id
      );
      if (destroyResponse) {
        const deleteFood = await FoodModel.findByIdAndDelete(req.params._id);
        res.status(200).send(deleteFood);
      }
    } else {
      console.log("Action terminated. Failed to deleted food item image..");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
