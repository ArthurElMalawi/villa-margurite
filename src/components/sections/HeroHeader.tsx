import React, { useEffect, useState } from "react";
import styles from "./HeroHeader.module.scss";

function HeroHeader() {
    const imgUrl = "https://picsum.photos/1500/1000"

    return (
        <section className={styles.heroHeader}>
            <div>
                <h1>This is a title</h1>
                <h4>This is a subtitle</h4>
            </div>
            <img src={imgUrl} alt="hero header image" />
        </section>
    );
}

export default HeroHeader