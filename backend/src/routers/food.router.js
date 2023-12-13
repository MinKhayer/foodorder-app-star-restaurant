import { Router } from "express";
import { FoodModel } from "../models/food.model.js";
import handler from "express-async-handler";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploader");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname; // Get the original filename
    const extension = originalname.split(".").pop(); // Get the file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage });

const router = Router();
//Add Food
router.post("/", upload.single("imageUrl"), async (req, res) => {
  try {
    if (req.file.filename) req.body.imageUrl = req.file.filename;
    const data = await FoodModel.create(req.body);
    res.status(200).json({
      success: true,
      data: data,
    });
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

//Food Item Delete

router.delete("/", async (req, res) => {
  const myId = req.query.id;
  const data = await FoodModel.find({ price: myId });
  try {
    if (data.length > 0) {
      const result = await FoodModel.deleteOne({ price: myId });
      res.send({
        message: "deleted successfully",
        data: result,
      });
    } else {
      res.send({
        message: "no data found",
      });
    }
  } catch (error) {
    console.log("Something wrong");
  }
});

export default router;
