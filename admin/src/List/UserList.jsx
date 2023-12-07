import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        axios.get(`/users`)
            .then((res) => {
                setLoading(false)
                setUser(res.data)
            })
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },

        { field: 'Name', headerName: 'Name', width: 130 },

    ];
    return (
        <div style={{ height: 600, width: '100%' }}>
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
                    checkboxSelection
                    disableSelectionOnClick
                />
            }
        </div>
    )
}

export default UserList;
