"use client";
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { getAllPokemonAbilities, getAllPokemonTypes } from "@/app/api/pokedex";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import EditPokemonForm from "@/components/Forms/EditPokemonForm/EditPokemonForm";
import { useRouter } from "next/navigation";

const Edit = ({ params }: { params: { id: number } }) => {
  const { push } = useRouter();
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
  const [pokemons, setPokemons] = useState<DetailedPokemon[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [firstType, setFirstType] = useState<string>("");
  const [secondType, setSecondType] = useState<string>("");
  const [firstAbility, setFirstAbility] = useState<string>("");
  const [secondAbility, setSecondAbility] = useState<string>("");
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

  const handleEditButtonOnClick = () => {
    setIsEditing(!isEditing);
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
    // console.log(e.target.value);
    if (e.target.name === "firstType") {
      setFirstType(e.target.value);
    } else if (e.target.name === "secondType") {
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

  const handleStatsOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "hp") {
      setHp(Number(e.target.value));
    } else if (e.target.name === "attack") {
      setAttack(Number(e.target.value));
    } else if (e.target.name === "defense") {
      setDefense(Number(e.target.value));
    } else if (e.target.name === "specialAttack") {
      setSpecialAttack(Number(e.target.value));
    } else if (e.target.name === "specialDefense") {
      setSpecialDefense(Number(e.target.value));
    } else if (e.target.name === "speed") {
      setSpeed(Number(e.target.value));
    }
  };

  const handleSubmitOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name === "" && !pokemon?.name) {
      alert("Name your Pokemon!");
      return;
    }

    try {
      const editedPokemon: DetailedPokemon = {
        id: pokemon?.id,
        name: name ? name : pokemon?.name,
        details: {
          weight: weight ? weight : pokemon.details?.weight,
          height: height ? height : pokemon.details?.height,
          types: [
            {
              name: pokemon.details.types[0]
                ? firstType !== ""
                  ? firstType
                  : pokemon.details.types[0].name
                : " none",
            },
            {
              name: pokemon.details.types[1]
                ? secondType !== ""
                  ? secondType
                  : pokemon.details.types[1].name
                : " none",
            },
          ],
          abilities: [
            {
              name: pokemon.details.abilities[0]
                ? firstAbility !== ""
                  ? firstAbility
                  : pokemon.details.abilities[0].name
                : " none",
            },
            {
              name: pokemon.details.abilities[1]
                ? secondAbility !== ""
                  ? secondAbility
                  : pokemon.details.abilities[1].name
                : " none",
            },
          ],
          stats: {
            hp: hp ? hp : pokemon.details.stats?.hp,
            attack: attack ? attack : pokemon.details.stats?.attack,
            defense: defense ? defense : pokemon.details.stats?.defense,
            specialAttack: specialAttack
              ? specialAttack
              : pokemon.details.stats?.specialAttack,
            specialDefense: specialDefense
              ? specialDefense
              : pokemon.details.stats?.specialDefense,
            speed: speed ? speed : pokemon.details.stats?.speed,
          },
        },
      };
      const index: number = pokemons.findIndex(
        (pokemon: DetailedPokemon) => pokemon.id === editedPokemon.id
      );
      console.log(editedPokemon);
      pokemons[index] = editedPokemon;
      console.log(pokemons[index]);
      localStorage.setItem("allPokemonsArray", JSON.stringify(pokemons));
      push(`/pokemon/${editedPokemon.id}`);
      setIsEditing(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const pokemonsArrayString = localStorage.getItem("allPokemonsArray");
    const pokemonsArray = pokemonsArrayString
      ? JSON.parse(pokemonsArrayString)
      : null;
    const detailedPokemon = pokemonsArray?.find(
      (pokemon: DetailedPokemon) => pokemon.id === Number(params.id)
    );
    handleFetchTypesFromApi();
    handleFetchAbilitiesFromApi();
    setPokemons(pokemonsArray);
    setPokemon(detailedPokemon);
  }, []);

  return (
    <div>
      <EditPokemonForm
        pokemon={pokemon}
        types={types}
        abilities={abilities}
        firstType={firstType}
        secondType={secondType}
        firstAbility={firstAbility}
        secondAbility={secondAbility}
        handleNameOnChange={handleNameOnChange}
        handleWeightOnChange={handleWeightOnChange}
        handleHeightOnChange={handleHeightOnChange}
        handleTypesOnChange={handleTypesOnChange}
        handleAbilitiesOnChange={handleAbilitiesOnChange}
        handleStatsOnChange={handleStatsOnChange}
        handleSubmitOnClick={handleSubmitOnClick}
      />
    </div>
  );
};

export default Edit;
