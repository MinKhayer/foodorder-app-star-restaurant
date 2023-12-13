import React from 'react';
import styled from 'styled-components';
import FoodItemlist from '../List/FoodItemlist';
import { PrimaryButton } from './CommonStyled';
import { useNavigate } from 'react-router-dom';

const FoodItemsContainer = styled.div`
  position: relative;
`;

const Header = styled.h1`
  margin-bottom: 40px;
  margin-top: 40px; // Add some margin to the bottom for spacing
`;

const AddButton = styled(PrimaryButton)`
  position: absolute;
  top: 0px;
  right: 30px;
 
  
`;

const FoodItems = () => {
  const navigate = useNavigate();

  return (
    <FoodItemsContainer>
      <Header>FoodItems</Header>
      <AddButton onClick={() => navigate('/foods/create')}>Add Item</AddButton>
      <FoodItemlist />
    </FoodItemsContainer>
  );
};

export default FoodItems;
