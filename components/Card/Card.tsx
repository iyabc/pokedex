"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

const Card = ({ pokemon }: { pokemon: DetailedPokemon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <div className={styles.imageWrapper}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
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
            {pokemon.details.types?.map((type: Type) => {
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
