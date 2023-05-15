"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { MouseEvent, useEffect, useState } from "react";
import Pill from "@/components/Pill/Pill";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: number } }) => {
  const { push } = useRouter();
  const [pokemons, setPokemons] = useState<DetailedPokemon[]>([]);
  const [pokemon, setPokemon] = useState<DetailedPokemon>({
    id: 0,
    name: "",
    details: {
      weight: 0,
      height: 0,
      types: [],
      abilities: [],
      stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
    },
  });

  const handleDeletOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const pokemonsAfterDelete = pokemons.filter(
      (localPokemon: DetailedPokemon) => localPokemon.id !== pokemon.id
    );
    localStorage.setItem(
      "allPokemonsArray",
      JSON.stringify(pokemonsAfterDelete)
    );
    push("/");
  };

  useEffect(() => {
    const pokemonsArrayString = localStorage.getItem("allPokemonsArray");
    const pokemonsArray = pokemonsArrayString
      ? JSON.parse(pokemonsArrayString)
      : null;
    const detailedPokemon = pokemonsArray?.find(
      (pokemon: DetailedPokemon) => pokemon.id === Number(params.id)
    );
    setPokemons(pokemonsArray);
    setPokemon(detailedPokemon);
  }, []);

  console.log(pokemon);

  return (
    <div
      className={[
        styles.container,
        styles.d_flex,
        styles.container_column,
      ].join(" ")}
    >
      <div className={[styles.container__header, styles.d_flex].join(" ")}>
        <Link href="/" className={styles.back_arrow}>
          &larr;
        </Link>
        <div>
          <button className={styles.icon_wrapper} onClick={handleDeletOnClick}>
            <Image
              className={styles.icon}
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
          <Link href={`/edit/${params.id}`} className={styles.icon_wrapper}>
            <Image
              className={styles.icon}
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
      </div>
      <div className={styles.container__inner}>
        <div className={styles.container__inner_header}>
          {/* <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`}
            alt={`${pokemon.name}`}
            width={150}
            height={50}
            loading="lazy"
            draggable={false}
            {...{
              layout: "intrinsic",
            }}
          /> */}
        </div>
        <div>
          <h1 className={styles.container__title}>{pokemon.name}</h1>
        </div>
      </div>
      <div className={styles.boxes_container}>
        <div className={styles.box}>
          <h4>Weight</h4>
          {pokemon.details?.weight}
        </div>
        <div className={styles.box}>
          <h4>Height</h4>
          {pokemon.details?.height}
        </div>
        <div className={styles.box}>
          <h4>Types</h4>
          <ul className={styles.container__list}>
            {pokemon.details.types?.map((type: Type) => {
              if (type.name !== "none") {
                return (
                  <li key={type.name}>
                    <Pill text={type.name} isType={true} />
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.box}>
          <h4>Abilities</h4>
          <ul className={styles.container__list}>
            {pokemon.details.abilities?.map((ability: Ability) => {
              if (ability.name !== "none") {
                return (
                  <li key={ability.name}>
                    <Pill text={ability.name} isType={false} />
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <div className={[styles.box, styles.box_colored].join(" ")}>
            <h4 className={styles.box_header}>Stats</h4>
            <div className={styles.box_body}>
              <ul
                className={[
                  styles.container__list,
                  styles.container__list_column,
                  styles.container__list_progress,
                ].join(" ")}
              >
                <li>
                  <label>HP</label>
                  <progress
                    value={pokemon.details.stats.hp}
                    max="100"
                    title={pokemon.details.stats.hp.toString()}
                  ></progress>
                </li>
                <li>
                  <label>Attack</label>
                  <progress
                    value={pokemon.details.stats.attack}
                    max="100"
                    title={pokemon.details.stats.attack.toString()}
                  ></progress>
                </li>
                <li>
                  <label>Defense</label>
                  <progress
                    value={pokemon.details.stats.defense}
                    max="100"
                    title={pokemon.details.stats.defense.toString()}
                  ></progress>
                </li>
                <li>
                  <label>Special Attack</label>
                  <progress
                    value={pokemon.details.stats.specialAttack}
                    max="100"
                    title={pokemon.details.stats.specialAttack.toString()}
                  ></progress>
                </li>
                <li>
                  <label>Special Defense</label>
                  <progress
                    value={pokemon.details.stats.specialDefense}
                    max="100"
                    title={pokemon.details.stats.specialDefense.toString()}
                  ></progress>
                </li>
                <li>
                  <label>Speed</label>
                  <progress
                    value={pokemon.details.stats.speed}
                    max="100"
                    title={pokemon.details.stats.speed.toString()}
                  ></progress>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.overflow_half}></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
