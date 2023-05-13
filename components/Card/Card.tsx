"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";
import Link from "next/link";

const Card = ({ id, pokemon }: { id: string; pokemon: BasicPokemon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <div className={styles.imageWrapper}>
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
              alt={`pokemon.name`}
              width={150}
              height={50}
              loading="lazy"
              draggable={false}
              {...{
                layout: "intrinsic",
              }}
            />
          </div>
          <div className={styles.cardTitle}>{pokemon.name}</div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardTypesContainer}>
            {pokemon.types?.map((type: Type) => {
              if (type.name !== "none") {
                return <Pill key={type.name} text={type.name} isType={true} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
