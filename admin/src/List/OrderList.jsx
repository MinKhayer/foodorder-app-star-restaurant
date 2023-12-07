import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';




const OrderList = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        const token = 'MinkhayerRahman@54666666666';
        axios.get(`/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setLoading(false);
                setOrder(res.data);
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 130 },

    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            {
                loading ? <div> Loading...</div> : <DataGrid
                    rows={order.map((item) => ({ id: item._id, Name: item.name }))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}

                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            }
        </div>

    )
}

export default OrderList;

// const Actions = styled.div`
// width:100%;
// display:flex;
// justify-content: space-between;
// button{
//   border: none;
//   outline:none;
//   padding: 3px 5px;
//   color:white;
//   border-radius: 3 px;
//   cursor: pointer;
// }
// `;
// const Delete = styled.button`
//   background-color: rgb(255, 77, 73);
// `;
// const View = styled.button`
//   background-color: rgb(114, 225, 40);
// `;

