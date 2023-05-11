"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Card = ({
  id,
  pokemon,
  handleDelete,
}: {
  id: string;
  pokemon: BasicPokemon;
  handleDelete: any;
}) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <input
          type="image"
          src="/icons/delete_icon.svg"
          title="Delete Pokemon"
        />
      </div>
      <div className={styles["card__body"]}>
        <div className={styles["img-wrapper"]}>
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
        <h1 className={styles["card__title"]}>{pokemon.name}</h1>
        <div className={styles["card__types-container"]}>
          {pokemon.types?.map((type: Type) => {
            if (type && type.toString() !== "none") {
              return (
                <Pill
                  key={type.toString()}
                  text={type.toString()}
                  isType={true}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={styles["card__footer"]}>
        <Link className={styles["more-link"]} href={`/pokemon/${pokemon.name}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
