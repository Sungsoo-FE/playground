"use client";
import { DB } from "@/app/firebase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const RandomLunchView: React.FC = () => {
  const [formData, setFormData] = useState<Food>({
    name: "",
    food: "",
    category: "",
    region: "",
    type: "",
  });
  const [foods, setFoods] = useState<Food[]>();
  const [selectedFood, setSelectedFood] = useState<Food>();

  const getFoods = async () => {
    const res = await DB.read("foods/");
    if (res === "no data") {
    } else {
      setFoods(res);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const getRandomFood = () => {
    const random_index = Math.floor(Math.random() * foods.length);
    setSelectedFood(foods[random_index]);
  };

  const handleChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "food":
        setFormData((prev) => ({
          ...prev,
          food: e.target.value,
        }));
        break;
      case "category":
        setFormData((prev) => ({
          ...prev,
          category: e.target.value,
        }));
        break;
      case "region":
        setFormData((prev) => ({
          ...prev,
          region: e.target.value,
        }));
        break;
      case "name":
        setFormData((prev) => ({
          ...prev,
          name: e.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const addFood = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    DB.create("foods/", formData);
    getFoods();
  };

  return (
    <div>
      {foods?.length > 0 &&
        foods.map((e) => (
          <div key={e.name}>
            <div>가게명: {e.name}</div>
            <div>음식: {e.food}</div>
            <div>위치: {e.region}</div>
          </div>
        ))}
      <form onSubmit={(e) => addFood(e)}>
        <div>
          <label>음식명</label>
          <input
            name="food"
            value={formData.food}
            onChange={handleChangeFormData}
          />
        </div>

        <div>
          <label>가게명</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChangeFormData}
          />
        </div>

        <div>
          <label>카테고리</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChangeFormData}
          />
        </div>

        <div>
          <label>지역</label>
          <input
            name="region"
            value={formData.region}
            onChange={handleChangeFormData}
          />
        </div>
        <button>추가하기</button>
      </form>
      <button onClick={getRandomFood}>오늘 메뉴 추천!</button>
      {selectedFood ? <div>오늘의 메뉴: {selectedFood.name}</div> : null}
    </div>
  );
};

export default RandomLunchView;
