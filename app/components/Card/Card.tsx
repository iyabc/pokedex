"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";

const Card = ({ pokemon, id }: { pokemon: BasicPokemon; id: string }) => {
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
        {pokemon.types?.map((type: Type) => {
          if (type.type.name) {
            return (
              <Pill key={type.type.name} text={type.type.name} isType={true} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Card;
