import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import styled from "styled-components";
import { base_url } from '../config';
//import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)
    //const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        axios.get(`/admin/users`)
            .then((res) => {
                setLoading(false)
                setUser(res.data.data)
                // console.log(res.data.data)
            })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${base_url}/users/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const columns = [
        { field: 'id', headerName: 'UserID', width: 220 },

        { field: 'Name', headerName: 'Name', width: 130 },
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
                        <View> <a target='_blank' rel='noreferrer' href={(`http://localhost:3000/food/${params.row.id}`)}>View</a></View>
                    </Actions>
                )
            }
        },

    ];
    return (
        <div style={{ height: 700, width: '100%' }}>
            {
                loading ? <div> Loading...</div> : <DataGrid
                    rows={user.map((item) => ({ id: item._id, Name: item.name }))}
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

export default UserList;
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
