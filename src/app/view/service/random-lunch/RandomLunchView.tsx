"use client";
import { DB } from "@/app/firebase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const RandomLunchView: React.FC = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    DB.read("/foods");
  }, []);

  return (
    <FoodListWrapper>
      {foods.map((e) => (
        <FoodLabel>{e}</FoodLabel>
      ))}
    </FoodListWrapper>
  );
};

const FoodListWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

const FoodLabel = styled.div`
  color: #f4f4f4;
  fontsize: 14px;
`;

export default RandomLunchView;
