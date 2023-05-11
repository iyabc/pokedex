"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const Add = () => {
  // const handleOnSubmit = (e: any) => {
  //   e.preventDefault();
  // };
  const [types, setTypes] = useState<Type[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);

  useEffect(() => {
    const fetchedLocalTypesString: string =
      localStorage.getItem("allPokemonTypesArray") ?? "";
    const fetchedLocalTypesArray: [] = fetchedLocalTypesString
      ? JSON.parse(fetchedLocalTypesString)
      : null;
    const fetchedLocalAbilitiesString: string =
      localStorage.getItem("allPokemonAbilitiesArray") ?? "";
    const fetchedLocalAbilitiesArray: [] = fetchedLocalAbilitiesString
      ? JSON.parse(fetchedLocalAbilitiesString)
      : null;

    setTypes(fetchedLocalTypesArray);
    setAbilities(fetchedLocalAbilitiesArray);
  }, []);

  return (
    // <form onSubmit={handleOnSubmit}>
    //   <div className={styles["form-group"]}>
    //     <label htmlFor="name">Name</label>
    //     <input name="name" id="name" type="text" />
    //   </div>
    //   <div className={styles["form-group"]}>
    //     <label htmlFor="name">Name</label>
    //     <input name="name" id="name" type="text" />
    //   </div>
    //   <div className={styles["form-group"]}>
    //     <label htmlFor="name">Name</label>
    //     <input name="name" id="name" type="text" />
    //   </div>
    // </form>
    <></>
  );
};

export default Add;
