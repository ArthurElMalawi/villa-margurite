import React from "react";
import styles from "./Livingroom.module.scss";
import Image from "next/image";
import Carousel from "../utils/Carousel";

function Livingroom() {
  let imgs = []

  for(let i=1; i <= 8; i ++){
    imgs.push("salon-"+ i);
  }

  console.log(imgs)

  return (
    <section id="livingroom" className={`section ${styles.livingroom}`}>
      <h2>Le salon</h2>
      <div className={styles.container}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius pharetra ex. Fusce vel mi ac dui molestie sodales. Praesent viverra convallis libero, vitae tempor purus congue vehicula. Morbi vehicula pretium porttitor. Ut malesuada vulputate nunc, in volutpat orci pulvinar sed. Nam hendrerit risus nec tincidunt convallis. Suspendisse facilisis luctus vehicula. Aenean ac justo dignissim, imperdiet ex rhoncus, tempus nisi. Nullam efficitur interdum ante, sollicitudin suscipit orci tempor quis. Sed a dui sed velit dapibus consequat ut imperdiet enim. Suspendisse vestibulum nibh at sagittis imperdiet. Quisque interdum lobortis pellentesque. Cras ultrices, urna sit amet malesuada tincidunt, augue nunc porttitor mauris, vitae sollicitudin velit justo fringilla dui.</p>
        <Carousel carouselItems={ 
          imgs.map((img) => (
              <Image
                key={img}
                src={`/assets/commons/livingroom/${img}.jpeg`}
                alt={img}
                width={1920}
                height={1080}
              />
          ))}
        />
      </div>
    </section>
  );
}

export default Livingroom;
