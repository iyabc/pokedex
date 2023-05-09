"use client";
import Image from "next/image";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { getAllPokemonTypes, getPokemonDetailsByName } from "@/app/api/pokedex";
import Pill from "@/app/components/Pill/Pill";
import Link from "next/link";
import CircleButton from "@/app/components/Buttons/CircleButton/CircleButton";
import MainButton from "@/app/components/Buttons/MainButton/MainButton";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { name: string } }) => {
  const router = useRouter();

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
  const [allTypes, setAllTypes] = useState<Object[]>([]);

  const [newName, setNewName] = useState<string>("");
  const [newTypes, setNewTypes] = useState<Type[]>([
    {
      type: {
        name: "",
      },
    },
  ]);
  const [newAbilities, setNewAbilities] = useState<Ability[]>([
    {
      ability: {
        name: "",
      },
    },
  ]);

  useEffect(() => {
    getAllPokemonTypes().then((result) => setAllTypes(result));
  }, []);

  useEffect(() => {
    getPokemonDetailsByName(params.name).then((result) => {
      setPokemon({
        id: result.id,
        name: result.name,
        details: {
          weight: result.weight,
          height: result.height,
          types: result.types,
          abilities: result.abilities,
          stats: result.stats,
        },
      });
      setId(`00${result.id}`.slice(-3));
    });
  }, [params.name]);

  const handleNameOnChange = (e: any) => {
    setNewName(e.target.value);
  };

  const handleTypeOnChange = (e: any) => {
    setNewTypes([
      ...newTypes,
      {
        type: {
          name: e.target.value,
        },
      },
    ]);
  };

  const handleAbilityOnChange = (e: any) => {
    setNewAbilities([
      ...newAbilities,
      {
        ability: {
          name: e.target.value,
        },
      },
    ]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    try {
      const updatedPokemon = {
        id: pokemon.id,
        name: newName ? newName : pokemon.name,
        details: {
          weight: pokemon.details.weight,
          height: pokemon.details.height,
          types: newTypes ? newTypes : pokemon.details.types,
          abilities: newAbilities ? newAbilities : pokemon.details.abilities,
          stats: [],
        },
      };
      setPokemon(updatedPokemon);
    } catch {
      (error: any) => console.log(error);
    }
  };

  const logNewPokemon = () => {
    console.log(pokemon);
    // router.push(`/pokemon/${pokemon.name}`);
  };

  useEffect(() => {
    logNewPokemon();
  }, [pokemon]);

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
        <Link
          href={`/pokemon/${pokemon.name}`}
          className={styles["back-arrow"]}
        >
          &larr;
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
              priority={true}
              loading="eager"
              draggable={false}
              {...{
                layout: "intrinsic",
              }}
            />
          </div>
          <div>
            <h1 className={styles["container__title"]}>
              <input
                defaultValue={pokemon.name}
                onChange={handleNameOnChange}
              />
            </h1>
          </div>
        </div>
        <form className={styles["boxes-container"]} onSubmit={handleSubmit}>
          <div className={styles["box"]}>
            <h4>Types</h4>
            {/* <CircleButton
              text="+"
              color="green"
              handleOnCLick={handleAddClick}
            /> */}
            <div className={styles["form-group"]}>
              {pokemon.details.types?.map((type: Type) => {
                return (
                  <select
                    key={type.type.name}
                    name="types"
                    id="types"
                    defaultValue={type.type.name}
                    onChange={handleTypeOnChange}
                  >
                    {allTypes?.map((type: any) => (
                      <option key={type.name}>{type.name}</option>
                    ))}
                  </select>
                );
              })}
              {/* {
                <select name="types" id="types">
                  {allTypes.map((type: any) => (
                    <option key={type.name}>{type.name}</option>
                  ))}
                </select>
              } */}
            </div>
          </div>
          <div className={styles["box"]}>
            <h4>Abilities</h4>
            <div className={styles["form-group"]}>
              {pokemon.details.abilities?.map((abilitiy: Ability) => (
                <input
                  className={styles["input-pill"]}
                  key={abilitiy.ability.name}
                  defaultValue={abilitiy.ability.name}
                  onChange={handleAbilityOnChange}
                  type="text"
                />
              ))}
            </div>
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
                    <li key={stat.stat.name}>
                      <label>{stat.stat.name}</label>
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
          <MainButton text="Submit" handleClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default Page;
