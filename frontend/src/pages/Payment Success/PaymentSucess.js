import React, { useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import classes from "./paymentSuccess.module.css";

export default function PaymentSucess() {
  const { removeAllFromCart } = useCart();

  useEffect(() => {
    removeAllFromCart();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <h3>Congratulations!</h3>
        <p>Your order has been placed successfully.</p>

        <p>Please wait while we prepare your food.</p>
        <p>Thank you for patience.</p>
        <div className={classes.button}>
          <Link to="/orders">Done</Link>
        </div>
      </div>
    </div>
  );
}
