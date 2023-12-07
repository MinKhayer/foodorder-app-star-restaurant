import dotenv from "dotenv";
dotenv.config();
import SSLCommerzPayment from "sslcommerz-lts";
import { Router } from "express";

import { OrderModel } from "../models/order.model.js";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox
const router = Router();

const tran_id = "1234";

router.post("/order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const order = await OrderModel.findOne({
    _id: orderId,
  });
  //console.log(order);

  const data = {
    total_amount: order?.totalPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/ssl/payment/success/${orderId}`,
    fail_url: "http://localhost:5000/api/ssl/payment/fail",
    cancel_url: "http://localhost:5000/api/ssl/payment/cancel",
    ipn_url: "http://localhost:5000/api/ssl/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: order.name,
    cus_email: "customer@example.com",
    cus_add1: order.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  //console.log(data);
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    //console.log(apiResponse);
    let GatewayPageURL = apiResponse.GatewayPageURL;

    res.send({ url: GatewayPageURL });

    // console.log("Redirecting to: ", GatewayPageURL);
  });

  router.post("/payment/success/:orderId", async (req, res) => {
    console.log(req.body);
    const data = await OrderModel.updateOne(
      {
        _id: req.params.orderId,
      },
      {
        $set: {
          status: "Paid",
        },
      }
    );
    console.log(data);
    if (data.modifiedCount > 0) {
      res.redirect("http://localhost:3000/payment/success");
    }
  });
  router.post("/payment/fail", async (req, res) => {
    res.redirect("http://localhost:3000/payment/fail");
  });
  router.post("/payment/cancel", async (req, res) => {
    res.redirect("http://localhost:3000/payment/camcel");
  });
});
export default router;
