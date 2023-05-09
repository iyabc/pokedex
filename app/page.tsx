"use client";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getAllPokemons, getPokemonDetails } from "./api/pokedex";
import Card from "./components/Card/Card";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    getAllPokemons()
      .then(async (result) => {
        const pokemonsWithDetails = await Promise.all(
          result.map(async (pokemon: Pokemon) => {
            const details = await getPokemonDetails(pokemon.url);

            return {
              name: pokemon.name,
              url: pokemon.url,
              id: details.id,
              details: {
                abilities: details.abilities,
                types: details.types,
              },
            };
          })
        );

        setPokemons(pokemonsWithDetails);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <main className={styles["main"]}>
      {pokemons &&
        pokemons.map((pokemon) => {
          const id = `00${pokemon.id}`.slice(-3);
          return (
            <Link key={pokemon.name} href={`/pokemon/${id}`}>
              <Card pokemon={pokemon} id={id} />
            </Link>
          );
        })}
    </main>
  );
}
