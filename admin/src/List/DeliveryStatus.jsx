// import axios from "axios";
// import { useEffect, useState } from "react";


// const DeliveryStatus = () => {
//     const [order, setOrder] = useState([]);
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         setLoading(true)
//         axios.get(`/admin/orders`)
//             .then((res) => {
//                 setLoading(false);
//                 setOrder(res.data.data)
//                 // setOrder(res.data);
//             })
//             .catch((error) => {
//                 // Handle error
//                 console.error('Error fetching orders:', error);
//                 setLoading(false);
//             });
//     }, []);
//     const handleDelivery = (e, id) => {
//         e.preventDefault()
//         const updated_status = e.target.value
//         console.log(updated_status, id)
//         console.log(id)
//     }
//     console.log("ordee info", order)
//     return (
//         <div>


//             <div className="relative overflow-x-auto">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr>
//                             <th scope="col" className="px-6 py-3">
//                                 ID
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Name
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Delivery Status
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {order?.map(item => <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                 {item._id}
//                             </th>
//                             <td className="px-6 py-4">
//                                 {item.name}
//                             </td>
//                             <td className="px-6 py-4">
//                                 <form onChange={() => handleDelivery(item?._id)} >
//                                     <select>
//                                         <option value="Prepared">Prepared</option>
//                                         <option value="Out for">Out for</option>
//                                         <option value="Served">Served</option>
//                                     </select>
//                                 </form>
//                             </td>

//                         </tr>)}


//                     </tbody>
//                 </table>
//             </div>


//         </div>
//     )
// }

// export default DeliveryStatus;

import axios from "axios";
import { useEffect, useState } from "react";

const DeliveryStatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState({});

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/admin/orders`)
            .then((res) => {
                setLoading(false);
                setOrders(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    const handleDelivery = (e, id) => {
        e.preventDefault();
        const updated_status = e.target.value;

        // Update the state with the updated delivery status for the corresponding order
        setUpdatedStatus((prevStatus) => ({
            ...prevStatus,
            [id]: updated_status,
        }));
        axios.post("/admin/updateDelivery", { id, status: updated_status })
            .then((res) => console.log(res.data))

        //console.log(updated_status, id);
    };

    console.log("order info", orders);

    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delivery Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((item) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item._id}
                                </th>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">
                                    <form onChange={(e) => handleDelivery(e, item._id)}>
                                        <select >
                                            <option value="Place Order">Place Order</option>
                                            <option selected={item.delivery_status === "Preparing food" ? true : false} value="Preparing food">Preparing food</option>
                                            <option selected={item.delivery_status === "Out for delivery" ? true : false} value="Out for delivery">Out for delivery</option>
                                            <option selected={item.delivery_status === "Delivered" ? true : false} value="Delivered">Delivered</option>
                                        </select>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryStatus;
