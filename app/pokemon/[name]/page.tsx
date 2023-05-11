"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getPokemonDetailsByName } from "@/app/api/pokedex";
import Pill from "@/app/components/Pill/Pill";
import Link from "next/link";

const Page = ({ params }: { params: { name: string } }) => {
  const [pokemon, setPokemon] = useState<DetailedPokemon>({
    id: 0,
    name: "",
    details: {
      weight: 0,
      height: 0,
      types: [],
      abilities: [],
      stats: [],
    },
  });
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const pokemonsArrayString = localStorage.getItem("allPokemonsArray");
    const pokemonsArray = pokemonsArrayString
      ? JSON.parse(pokemonsArrayString)
      : null;

    const detailedPokemon = pokemonsArray?.find(
      (pokemon: DetailedPokemon) =>
        pokemon.name.toLowerCase() === params.name.toLowerCase()
    );
    setPokemon(detailedPokemon);
    setId(`00${detailedPokemon.id}`.slice(-3));
  }, []);

  console.log(pokemon);

  return (
    <div
      className={[
        styles["container"],
        styles["d-flex"],
        styles["container--column"],
      ].join(" ")}
    >
      <div
        className={[styles["container__header"], styles["d-flex"]].join(" ")}
      >
        <Link href="/" className={styles["back-arrow"]}>
          &larr;
        </Link>
        <Link
          className={styles["edit_icon-wrapper"]}
          href={`/pokemon/${pokemon.name}/edit`}
        >
          <Image
            className={styles["edit_icon"]}
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
        </Link>
      </div>
      <div className={styles["container__inner"]}>
        <div className={styles["container__inner-header"]}>
          <div className={styles["img-wrapper"]}>
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
              alt={`${pokemon.name}`}
              width={150}
              height={50}
              loading="lazy"
              draggable={false}
              {...{
                layout: "intrinsic",
              }}
            />
          </div>
          <div>
            <h1 className={styles["container__title"]}>{pokemon.name}</h1>
          </div>
        </div>
        <div className={styles["boxes-container"]}>
          <div className={styles["box"]}>
            <h4>Types</h4>
            <ul className={styles["container__list"]}>
              {pokemon.details.types?.map((type: Type) => {
                return (
                  <li key={type.toString()}>
                    <Pill text={type.name} isType={true} />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles["box"]}>
            <h4>Abilities</h4>
            <ul className={styles["container__list"]}>
              {pokemon.details.abilities?.map((abilitiy: Ability) => (
                <li key={abilitiy.name}>
                  <Pill text={abilitiy.name} isType={false} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={[styles["box"], styles["box--colored"]].join(" ")}>
              <h4 className={styles["box__header"]}>Stats</h4>
              <div className={styles["box__body"]}>
                <ul
                  className={[
                    styles["container__list"],
                    styles["container__list--column"],
                    styles["container__list--progress"],
                  ].join(" ")}
                >
                  {pokemon.details.stats?.map((stat: Stat) => (
                    <li key={stat.name}>
                      <label>{stat.name}</label>
                      <progress
                        value={stat.base_stat}
                        max="100"
                        title={String(stat.base_stat)}
                      ></progress>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles["overflow--half"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
