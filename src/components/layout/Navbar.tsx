import React from "react";
import styles from "./Navbar.module.scss";

const sections = ["btn1", "Secondbtn", "Bouton3"]

function Navbar () {
    const listItems = sections.map((section) =>
        <li>{section}</li>
    );

  return (
    <nav className={styles.navbar}>
        <ul>{listItems}</ul>
    </nav>
    );
};

export default Navbar;