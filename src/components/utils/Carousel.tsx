"use client";

import React, { useEffect, useState, cloneElement, ReactElement } from "react";
import styles from "./Carousel.module.scss";

type SlideProps = { className?: string };

type CarouselProps = {
  carouselItems: ReactElement<SlideProps>[];
  [key: string]: unknown;
};

const Carousel = ({ carouselItems, ...rest }: CarouselProps) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % carouselItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className={styles.carousel}>
      {carouselItems.map((item, index) => {
        const activeClass = active === index ? " visible" : "";

        return cloneElement(item, {
          ...rest,
          className: `carousel-item${activeClass}`,
        });
      })}
    </div>
  );
};

export default Carousel;
