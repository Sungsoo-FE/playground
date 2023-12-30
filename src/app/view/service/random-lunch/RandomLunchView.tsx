import { DB } from "@/app/firebase";
import { useEffect, useState } from "react";

const RandomLunchView: React.FC = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    DB.read("/foods");
  }, []);

  return <></>;
};

export default RandomLunchView;
