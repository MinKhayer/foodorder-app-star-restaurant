import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import styled from "styled-components";
import { base_url } from '../config';
//import { useNavigate } from 'react-router-dom';
//import dropdown from '../components/dropdown';





const OrderList = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate();



    // useEffect(() => {
    //     setLoading(true);

    //     // Assuming the token is stored in session storage under the key 'data'
    //     const tokenData = JSON.parse(sessionStorage.getItem('data'));
    //     const token = tokenData ? tokenData.id : '';
    //     console.log(tokenData)

    //     axios.get(`/orders`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //     })
    //         .then((res) => {
    //             console.log(res)
    //             setLoading(false);
    //             setOrder(res.data);
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error('Error fetching orders:', error);
    //         });
    // }, []);



    useEffect(() => {
        setLoading(true)
        axios.get(`/admin/orders`)
            .then((res) => {
                setLoading(false);
                setOrder(res.data.data)
                // setOrder(res.data);
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${base_url}/orders/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const columns = [
        { field: 'id', headerName: 'OrderID', width: 220 },
        { field: 'FoodItem', headerName: 'FoodItem', width: 230 },
        { field: 'TotalPrice', headerName: 'TotalPrice', width: 130 },
        { field: 'Name', headerName: 'CustomerName', width: 130 },
        { field: 'Address', headerName: 'Address', width: 130 },
        { field: 'PhoneNumber', headerName: 'PhoneNumber', width: 130 },

        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 170,
            renderCell: (params) => {
                // console.log(params)
                return (
                    <Actions>
                        <Delete onClick={() => handleDelete(params.row.id)}>Delete

                        </Delete>
                        <View> <a target='_blank' rel='noreferrer' href={(`http://localhost:3000/track/${params.row.id}`)}>View</a></View>
                    </Actions>
                )
            }
        },
        { field: 'DeliveryStatus', headerName: 'DeliveryStatus', width: 130 }

    ];
    return (
        <div style={{ height: 700, width: '100%' }}>
            {
                loading ? <div> Loading...</div> : <DataGrid
                    rows={order.map((item) => (
                        {
                            id: item._id,
                            FoodItem: item?.items?.map(foods => foods?.food?.name),
                            TotalPrice: item.totalPrice,
                            Name: item?.name,
                            Address: item?.address,
                            PhoneNumber: item?.phoneNumber
                        }))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}

                    pageSizeOptions={[5, 10]}
                    //checkboxSelection
                    disableSelectionOnClick
                />
            }
        </div>

    )
}

export default OrderList;

const Actions = styled.div`
width:100%;
display:flex;
justify-content: space-between;
button{
  border: none;
  outline:none;
  padding: 3px 5px;
  color:white;
  border-radius: 3 px;
  cursor: pointer;
}
`;
const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

