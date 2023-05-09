"use client";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  getAllPokemonAbilities,
  getAllPokemonTypes,
  getAllPokemons,
  getPokemonDetailsByName,
} from "./api/pokedex";
import Card from "./components/Card/Card";
import Link from "next/link";
import CircleButton from "./components/Buttons/CircleButton/CircleButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pokemons, setPokemons] = useState<BasicPokemon[]>([]);
  const [allTypes, setAllTypes] = useState<Type[]>([]);
  const [allAbilities, setAllAbilities] = useState<Ability[]>([]);

  const [newName, setNewName] = useState<string>("");

  const [firstType, setFirstType] = useState<string>("normal");
  const [secondType, setSecondType] = useState<string>("");
  const [thirdType, setThirdType] = useState<string>("");

  const [firstAbility, setFirstAbility] = useState<string>("stench");
  const [secondAbility, setSecondAbility] = useState<string>("");

  const handleSubmitAdd = (e: any) => {
    e.preventDefault();

    if (newName !== "") {
      if (pokemons.some((pokemon) => pokemon.name === newName)) {
        alert("That Pokémon already exists!");
        return;
      }

      try {
        const lastPokemonId = pokemons.sort((a, b) => b.id - a.id)[0]?.id;

        const newPokemon = {
          id: lastPokemonId + 1,
          name: newName,
          types: [
            { type: { name: firstType && firstType } },
            { type: { name: secondType && secondType } },
            { type: { name: thirdType && thirdType } },
          ],
        };
        setPokemons([...pokemons, newPokemon]);
      } catch {
        (error: any) => {
          console.log(error);
        };
      }
    } else {
      alert("Name your Pokémon!");
    }
  };

  const handleNameChange = (e: any) => {
    setNewName(e.target.value);
  };

  const handleTypeschange = (e: any) => {
    if (e.target.name == "first-type") {
      setFirstType(e.target.value);
    } else if (e.target.name == "second-type") {
      setSecondType(e.target.value);
    } else if (e.target.name == "third-type") {
      setThirdType(e.target.value);
    }
  };

  const handleAbilitieschange = (e: any) => {
    if (e.target.name == "first-ability") {
      setFirstAbility(e.target.value);
    } else if (e.target.name == "second-ability") {
      setSecondAbility(e.target.value);
    }
  };

  useEffect(() => {
    getAllPokemons()
      .then(async (result) => {
        const pokemonsWithDetails = await Promise.all(
          result.map(async (pokemon: BasicPokemon) => {
            const details = await getPokemonDetailsByName(pokemon.name);
            return {
              name: details.name,
              id: details.id,
              types: details.types,
            };
          })
        );

        setPokemons(pokemonsWithDetails);
      })
      .catch((error) => {
        console.log(error.message);
      });
    getAllPokemonTypes()
      .then((result) => setAllTypes(result))
      .catch((error) => {
        console.log(error.message);
      });
    getAllPokemonAbilities()
      .then((result) => setAllAbilities(result))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className={styles["add-form-container"]}>
        <form className={styles["add-form"]}>
          <div className={styles["add-form__header"]}>
            <h3>Add Pokemon</h3>
            <CircleButton
              text="+"
              color="green"
              handleOnCLick={handleSubmitAdd}
            />
          </div>
          <div className={styles["add-form__body"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="name">
                <h4>Name</h4>
              </label>
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleNameChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <h4>Abilities</h4>
              <select
                name="first-ability"
                id="first-ability"
                onChange={handleAbilitieschange}
              >
                {allAbilities.map((ability: any) => (
                  <option
                    key={ability.name}
                    value={ability.name}
                    disabled={ability.name === secondAbility}
                  >
                    {ability.name}
                  </option>
                ))}
              </select>
              <select
                name="second-ability"
                id="second-ability"
                onChange={handleAbilitieschange}
              >
                {allAbilities.map((ability: any) => (
                  <option
                    key={ability.name}
                    value={ability.name}
                    disabled={ability.name === firstAbility}
                  >
                    {ability.name}
                  </option>
                ))}
                <option value="">none</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <h4>Types</h4>
              <select
                name="first-type"
                id="first-type"
                onChange={handleTypeschange}
              >
                {allTypes.map((type: any) => (
                  <option
                    key={type.name}
                    value={type.name}
                    disabled={
                      type.name === secondType || type.name === thirdType
                    }
                  >
                    {type.name}
                  </option>
                ))}
              </select>
              <select
                name="second-type"
                id="second-type"
                onChange={handleTypeschange}
              >
                {allTypes.map((type: any) => (
                  <option
                    key={type.name}
                    value={type.name}
                    disabled={
                      type.name === firstType || type.name === thirdType
                    }
                  >
                    {type.name}
                  </option>
                ))}
                <option value="">none</option>
              </select>
              <select
                name="third-type"
                id="third-type"
                onChange={handleTypeschange}
              >
                {allTypes.map((type: any) => (
                  <option
                    key={type.name}
                    value={type.name}
                    disabled={
                      type.name === firstType || type.name === secondType
                    }
                  >
                    {type.name}
                  </option>
                ))}
                <option value="">none</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <main className={styles["main"]}>
        {pokemons?.map((pokemon) => {
          const id = `00${pokemon.id}`.slice(-3);

          return (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
              <Card pokemon={pokemon} id={id} />
            </Link>
          );
        })}
      </main>
    </>
  );
}
