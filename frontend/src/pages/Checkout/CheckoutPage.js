import React from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import classes from "./CheckoutPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Map from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
export default function CheckoutPage() {
  //const params = useParams();
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  console.log(user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    // if (!order.addressLatLng) {
    //   toast.warning("Please select your location on the map");
    //   return;
    // }

    const orderData = await createOrder({
      ...order,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
    });
    navigate(`/track/${orderData._id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register("name")}
              error={errors.name}
            />
            <Input
              defaultValue={user.phoneNumber}
              label="Phone Number"
              {...register("phoneNumber")}
              error={errors.phoneNumber}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register("address")}
              error={errors.address}
            />
          </div>
          <OrderItemsList order={order} />
        </div>
        {/* <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latlng) => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div> */}

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Track your Order"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
