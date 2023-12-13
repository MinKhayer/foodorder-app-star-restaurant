import { Router } from "express";
const router = Router();
import adminmodel from "../models/admin.model.js"; // Corrected import statement
import { OrderModel } from "../models/order.model.js";
import { UserModel } from "../models/user.model.js";

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const isAdmin = await adminmodel.find({ email, password });
  try {
    if (isAdmin.length > 0) {
      res.status(200).send({
        message: "Login Successfull",
        data: isAdmin,
      });
    } else {
      res.status(400).send({
        message: "Login failed",
        data: isAdmin,
      });
    }
  } catch (error) {
    res.send({
      message: "Login failed",
      data: isAdmin,
    });
  }
});

router.get("/orders", async (req, res) => {
  try {
    // const admin = await adminmodel.find();
    const orders = await OrderModel.find();
    res.status(200).send({
      message: "data found successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateDelivery", async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  console.log(id, status);
  try {
    const data = await OrderModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          delivery_status: status,
        },
      }
    );
    res.status(200).send({
      message: "status updated successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    // const admin = await adminmodel.find();
    const orders = await UserModel.find();
    res.status(200).send({
      message: "data found successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
