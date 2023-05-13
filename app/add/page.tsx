"use client";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import AddPokemonForm from "../../components/Forms/AddPokemonForm/AddPokemonForm";
import {
  getAllPokemonTypes,
  getAllPokemonAbilities,
  getAllPokemonStats,
} from "../api/pokedex";

const Add = () => {
  const { push } = useRouter();
  const [pokemons, setPokemons] = useState<DetailedPokemon[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<number>(0.0);
  const [height, setHeight] = useState<number>(0.0);
  const [firstType, setFirstType] = useState<string>("none");
  const [secondType, setSecondType] = useState<string>("none");
  const [firstAbility, setFirstAbility] = useState<string>("none");
  const [secondAbility, setSecondAbility] = useState<string>("none");
  const [hp, setHp] = useState<number>(0.0);
  const [attack, setAttack] = useState<number>(0.0);
  const [defense, setDefense] = useState<number>(0.0);
  const [specialAttack, setSpecialAttack] = useState<number>(0.0);
  const [specialDefense, setSpecialDefense] = useState<number>(0.0);
  const [speed, setSpeed] = useState<number>(0.0);

  const handleFetchTypesFromApi = async () => {
    try {
      const result = await getAllPokemonTypes();
      setTypes(result);
    } catch (error) {
      throw error;
    }
  };

  const handleFetchAbilitiesFromApi = async () => {
    try {
      const result = await getAllPokemonAbilities();
      setAbilities(result);
    } catch (error) {
      throw error;
    }
  };

  const handleFetchStatsFromApi = async () => {
    try {
      const result = await getAllPokemonStats();
      setStats(result);
    } catch (error) {
      throw error;
    }
  };

  const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleWeightOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleHeightOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const handleTypesOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name == "firstType") {
      setFirstType(e.target.value);
    } else if (e.target.name == "secondType") {
      setSecondType(e.target.value);
    }
  };

  const handleAbilitiesOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name == "firstAbility") {
      setFirstAbility(e.target.value);
    } else if (e.target.name == "secondAbility") {
      setSecondAbility(e.target.value);
    }
  };

  const handleHpOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHp(Number(e.target.value));
  };

  const handleAttackOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAttack(Number(e.target.value));
  };

  const handleDefenseOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDefense(Number(e.target.value));
  };

  const handleSpecialAttackOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecialAttack(Number(e.target.value));
  };

  const handleSpecialDefenseOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecialDefense(Number(e.target.value));
  };

  const handleSpeedOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Name your Pokémon!");
      return;
    }

    if (pokemons.some((pokemon) => pokemon.name === name)) {
      alert("That Pokémon already exists!");
      return;
    }

    try {
      const lastPokemonId = [...pokemons].sort((a, b) => b.id - a.id)[0]?.id;

      const newPokemon: DetailedPokemon = {
        id: lastPokemonId + 1,
        name: name,
        details: {
          weight: weight,
          height: height,
          abilities: [
            { name: firstAbility !== "" ? firstAbility : "none" },
            { name: secondAbility !== "" ? secondAbility : "none" },
          ],
          types: [
            { name: firstType !== "" ? firstType : "none" },
            { name: secondType !== "" ? secondType : "none" },
          ],
          stats: {
            hp: hp,
            attack: attack,
            defense: defense,
            specialAttack: specialAttack,
            specialDefense: specialDefense,
            speed: speed,
          },
        },
      };
      console.log(newPokemon);
      alert(`Added ${name}`);
      localStorage.setItem(
        "allPokemonsArray",
        JSON.stringify([...pokemons, newPokemon])
      );
      push("/");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchedLocalPokemonsString = localStorage.getItem("allPokemonsArray");
    const fetchedPokemonsArray = fetchedLocalPokemonsString
      ? JSON.parse(fetchedLocalPokemonsString)
      : null;
    setPokemons(fetchedPokemonsArray);
    handleFetchTypesFromApi();
    handleFetchAbilitiesFromApi();
    handleFetchStatsFromApi();
  }, []);

  return (
    <div>
      <AddPokemonForm
        types={types}
        abilities={abilities}
        stats={stats}
        name={name}
        weight={weight}
        height={height}
        firstType={firstType}
        secondType={secondType}
        firstAbility={firstAbility}
        secondAbility={secondAbility}
        handleNameOnChange={handleNameOnChange}
        handleWeightOnChange={handleWeightOnChange}
        handleHeightOnChange={handleHeightOnChange}
        handleTypesOnChange={handleTypesOnChange}
        handleAbilitiesOnChange={handleAbilitiesOnChange}
        handleHpOnChange={handleHpOnChange}
        handleAttackOnChange={handleAttackOnChange}
        handleDefenseOnChange={handleDefenseOnChange}
        handleSpecialAttackOnChange={handleSpecialAttackOnChange}
        handleSpecialDefenseOnChange={handleSpecialDefenseOnChange}
        handleSpeedOnChange={handleSpeedOnChange}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default Add;
