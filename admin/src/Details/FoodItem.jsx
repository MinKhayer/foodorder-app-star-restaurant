import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import CreateFoodItem from "../pages/CreateFoodItem";

const FoodItem = () => {
    const { id } = useParams();
    const [foodItem, setFoodItem] = useState({});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    console.log(foodItem);

    useEffect(() => {
        setLoading(true)
        axios.get(`/foods/${id}`)
            .then((res) => {
                setLoading(false)
                setFoodItem(res.data)
            })
    }, []);

    return (
        <>
            <CreateFoodItem />
        </>
    )


};

export default FoodItem;

