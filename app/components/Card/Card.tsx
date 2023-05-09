"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  pokemon,
  id,
  handleDelete,
  handleEdit,
  cardState,
}: {
  pokemon: BasicPokemon;
  id: string;
  handleDelete: any;
  handleEdit: any;
  cardState: string;
}) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <button
          className={styles["action-button"]}
          onClick={(pokemon) => {
            handleDelete(pokemon);
          }}
        >
          <Image
            className={styles["action-icon"]}
            src="/icons/delete_icon.svg"
            alt="Delete Icon"
            width={24}
            height={24}
            loading="lazy"
            draggable={false}
            {...{
              layout: "intrinsic",
            }}
          />
        </button>
        <button className={styles["action-button"]} onClick={handleEdit}>
          <Image
            className={styles["action-icon"]}
            src="/icons/edit_icon.svg"
            alt="Edit Icon"
            width={24}
            height={24}
            loading="lazy"
            draggable={false}
            {...{
              layout: "intrinsic",
            }}
          />
        </button>
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
            if (type.type.name) {
              return (
                <Pill
                  key={type.type.name}
                  text={type.type.name}
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
