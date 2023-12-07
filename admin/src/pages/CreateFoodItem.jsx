import axios from "axios";
import { useEffect, useState } from "react"
import { WithContext as ReactTags } from 'react-tag-input';
import styled from "styled-components";



const CreateFoodItem = () => {

  const [postData, setPostData] = useState();
  const [tags, setTags] = useState([
  ]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  console.log(postData)


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = parseFloat(form.price.value);
    const cookTime = form.cookTime.value;

    const description = form.description.value;
    const imageUrl = form.imageUrl.value;

    const foodItem = {
      name,
      price,
      cookTime,
      favorite: isFavorite,
      description,
      imageUrl,
      tags
    }

    setPostData(foodItem)
  }

  useEffect(() => {

    const fetchData = async () => {
      await axios.post('http://192.168.0.128:5000/api/foods', postData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchData()
  }, [postData])

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <label >FoodItem Name: </label>
        <input className="border" type="text" name="name" />
        <label >FoodItem Price: </label>
        <input className="border" type="number" name="price" />
        <label >CookTime: </label>
        <input className="border" type="text" name="cookTime" />
        <label>Favorite: </label>
        <input
          className="border"
          type="radio"
          name="favorite"
          checked={isFavorite}
          onChange={() => setIsFavorite(!isFavorite)}
        />
        <label >Description: </label>
        <input className="border" type="text" name="description" />
        <label >Image: </label>
        <input type="file" name="imageUrl" id="" />
        <label >Tags: </label>

        <ReactTags
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
        <button>submit</button>
      </div>
    </StyledForm>
  )
}

export default CreateFoodItem;

const StyledForm = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);

  label {
    display: inline-block;
    margin-top: 3px;
  }

  input,
  select,
  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  input[type="file"] {
    margin-top: 3px;
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 15px;
    cursor: pointer;
    &:hover {
      background-color: #45a049;
    }
  }

  /* Styling for react-tag-input */
  .ReactTags {
    width: 50%;
  }

  .ReactTags__selected {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .ReactTags__tag {
    background: #4caf50;
    color: white;
    border-radius: 2px;
    margin: 1px;
    padding: 2px 4px;
    cursor: pointer;
  }

  .ReactTags__remove {
    margin-left: 5px;
    cursor: pointer;
  }
`;
