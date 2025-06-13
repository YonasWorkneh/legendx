import { AiOutlineRise } from "react-icons/ai";
import styles from "./hero.module.css";
import Star from "./Star";
import { formatDate } from "../../../utils/date";
import { useEffect, useState } from "react";

function Hero() {
  const positions = [
    { top: 45, right: 87 },
    { top: 150, right: 200 },
    { top: 75, right: 290 },
    { top: 60, right: 135 },
    { top: 220, right: 250 },
    { top: 100, right: 45 },
    { top: 80, right: 120 },
    { top: 310, right: 70 },
    { top: 290, right: 155 },
    { top: 180, right: 300 },
    { top: 240, right: 25 },
    { top: 140, right: 210 },
    { top: 50, right: 230 },
    { top: 270, right: 95 },
    { top: 130, right: 60 },
    { top: 225, right: 330 },
    { top: 10, right: 150 },
    { top: 105, right: 275 },
    { top: 115, right: 40 },
    { top: 300, right: 125 },
    { top: 40, right: 80 },
    { top: 260, right: 175 },
    { top: 170, right: 240 },
    { top: 295, right: 235 },
    { top: 55, right: 295 },
    { top: 85, right: 115 },
    { top: 135, right: 205 },
    { top: 45, right: 110 },
    { top: 190, right: 50 },
    { top: 65, right: 145 },
    { top: 200, right: 80 },
    { top: 120, right: 165 },
    { top: 230, right: 220 },
    { top: 125, right: 285 },
    { top: 295, right: 10 },
    { top: 150, right: 90 },
    { top: 70, right: 130 },
    { top: 100, right: 70 },
    { top: 110, right: 285 },
    { top: 180, right: 330 },
  ];
  const [date, setDate] = useState(Date.now());

  useEffect(
    function () {
      setInterval(() => setDate(Date.now()), 1000);
    },
    [date]
  );
  return (
    <div className={styles.hero}>
      <p className={styles.main}>
        Elevate your fitness management business with legendx
      </p>
      <span className={styles.middle}>
        <AiOutlineRise />
        {Array.from({ length: 40 }).map((_, index) => {
          const { top, right } = positions[index];
          return (
            <Star
              key={index}
              color={right > 40 ? "#ffffff26" : "#8b8b8b"}
              top={top}
              right={right}
            />
          );
        })}
      </span>
      <p className={styles.date}>{formatDate(true, date).replace(",", " ")}</p>
    </div>
  );
}

export default Hero;
