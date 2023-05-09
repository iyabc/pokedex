"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";

const Card = ({ pokemon, id }: { pokemon: Pokemon; id: string }) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["img-wrapper"]}>
        <Image
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
          alt={`pokemon.name`}
          width={150}
          height={50}
          priority={true}
          loading="eager"
          draggable={false}
          {...{
            layout: "intrinsic",
          }}
        />
      </div>
      <h1 className={styles["card-title"]}>{pokemon.name}</h1>
      <div className={styles["card-types-container"]}>
        {pokemon.details.types?.map((type: Type) => {
          return <Pill key={type.slot} type={type.type.name} />;
        })}
      </div>
    </div>
  );
};

export default Card;
