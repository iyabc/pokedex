import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import CircleButton from "../Buttons/CircleButton/CircleButton";

const Navbar = () => {
  return (
    <>
      <nav className={styles["navbar"]}>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Pokedex Logo"
            width={200}
            height={50}
            priority={true}
            loading="eager"
            draggable={false}
            {...{
              layout: "intrinsic",
            }}
          />
        </Link>
      </nav>
      <div className={styles["overflow-center"]}>
        {/* <Link href="/add">
          <CircleButton text="+" color="green" handleOnCLick="" />
        </Link> */}
      </div>
    </>
  );
};

export default Navbar;
