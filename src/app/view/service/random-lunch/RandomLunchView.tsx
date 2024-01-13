"use client";
import { DB } from "@/app/firebase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const RandomLunchView: React.FC = () => {
  const [formData, setFormData] = useState<Food>({
    name: "",
    category: "",
    region: "",
    type: "",
  });
  const [foods, setFoods] = useState([]);

  const getFoods = () => {
    DB.read("foods/");
  };

  useEffect(() => {
    const res = getFoods();
  }, []);

  const handleChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setFormData((prev) => ({
          ...prev,
          name: e.target.value,
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
      default:
        break;
    }
  };

  const addFood = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    DB.create("foods/", [...foods, formData]);
    getFoods();
  };

  return (
    <div>
      {foods.map((e) => (
        <div>{e}</div>
      ))}
      <form onSubmit={(e) => addFood(e)}>
        <div>
          <label>음식명</label>
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
    </div>
  );
};

export default RandomLunchView;
