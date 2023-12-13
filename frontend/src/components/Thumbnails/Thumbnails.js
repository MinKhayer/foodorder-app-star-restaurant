import React from "react";
import classes from "./thumbnails.module.css";
import { Link } from "react-router-dom";
//import StarRating from "../StarRating/StarRating";
import Price from "../Price/Price";
import { base_url } from "../../utility/baseUrl";
export default function Thumbnails({ foods }) {
  console.log(foods);
  return (
    <ul className={classes.list}>
      {foods.map((food) => (
        <li key={food.id}>
          <Link to={`/food/${food.id}`}>
            <img
              className={classes.image}
              //src={`/foods/${food.imageUrl}`}
              src={`${base_url}/${food.imageUrl}`}
              alt={food.name}
            />

            <div className={classes.content}>
              <div className={classes.name}>{food.name}</div>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
              {/* <div className={classes.stars}>
                <StarRating stars={food.stars} />
              </div> */}
              <div className={classes.product_item_footer}>
                <div className={classes.descriptions}>{food.description}</div>

                <div className={classes.cook_time}>
                  <span>🕒</span>
                  {food.cookTime}
                </div>
              </div>
              <div className={classes.price}>
                <Price price={food.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
