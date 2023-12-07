import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';




const FoodItemlist = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    axios.get(`/foods`)
      .then((res) => {
        setLoading(false)
        setFoodItem(res.data)
      })
  }, []);


  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    {
      field: 'imageUrl', headerName: 'Image', width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={`/foods/${params.row.imageUrl}`} alt="" />
          </ImageContainer>
        )
      }
    },
    { field: 'Name', headerName: 'FoodItem', width: 130 },
    { field: 'Cooktime', headerName: 'CookTime(MIN)', width: 130 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 170,
      renderCell: (params) => {
        console.log(params)
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

  const handleDelete = (id) => {

  }

  return (
    <div style={{ height: 600, width: '100%' }}>
      {
        loading ? <div> Loading...</div> : <DataGrid
          rows={foodItem.map((item) => ({ id: item._id, imageUrl: item.imageUrl, Name: item.name, Cooktime: item.cookTime, price: item.price }))}
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
  );
}
const ImageContainer = styled.div`
  img{
    height: 40px;
  }
`;
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

export default FoodItemlist

