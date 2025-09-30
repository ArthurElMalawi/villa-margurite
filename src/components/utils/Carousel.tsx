"use client";

import React, { useEffect, useState, cloneElement } from "react";
import styles from "./Carousel.module.scss";

const Carousel = ({ carouselItems, ...rest }: any) => {
  const [active, setActive] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % carouselItems.length);
    }, 2000);

    return () => clearInterval(interval);
    }, [carouselItems.length]);

  return (
    <div className={styles.carousel}>
      {carouselItems.map((item: any, index: number) => {
        const activeClass = active === index ? " visible" : "";
        return cloneElement(item, {
          ...rest,
          className: `carousel-item${activeClass}`
        });
      })}
    </div>
  );
};

export default Carousel