"use client";
import styles from "./Card.module.css";
import Pill from "../Pill/Pill";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Card = ({
  pokemon,
  id,
  allTypes,
  allAbilities,
  handleEditNameChange,
  handleEditedTypesChange,
  firstEditedType,
  secondEditedType,
  handleDelete,
  handleEdit,
}: {
  pokemon: BasicPokemon;
  id: string;
  allTypes: Type[];
  allAbilities: Ability[];
  handleEditNameChange: any;
  handleEditedTypesChange: any;
  firstEditedType: string;
  secondEditedType: string;
  handleDelete: any;
  handleEdit: any;
}) => {
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const handleChangeIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitEditForm = () => {
    setIsEditing(false);
    handleEdit(pokemon);
  };

  return (
    <div className={styles["card"]}>
      {isEditing ? (
        <>
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
            <button
              className={styles["action-button"]}
              onClick={handleChangeIsEditing}
            >
              <Image
                className={styles["action-icon"]}
                src="/icons/x_icon.svg"
                alt="X Icon"
                width={24}
                height={24}
                loading="lazy"
                draggable={false}
                {...{
                  layout: "intrinsic",
                }}
              />
              &times;
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
            <form>
              <h1 className={styles["card__title"]}>
                <input
                  name="name"
                  defaultValue={pokemon.name}
                  onChange={(e) => handleEditNameChange(e.target.value)}
                />
              </h1>
              <div className={styles["card__types-container"]}>
                <div className={styles["form-group"]}>
                  <h4>Types</h4>
                  <select
                    name="first-type"
                    id="first-type"
                    onChange={handleEditedTypesChange}
                    defaultValue={
                      pokemon.types[0]?.type.name
                        ? pokemon.types[0]?.type.name
                        : "normal"
                    }
                  >
                    {allTypes.map((type: any) => (
                      <option
                        key={type.name}
                        value={type.name}
                        disabled={type.name === secondEditedType}
                      >
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="second-type"
                    id="second-type"
                    onChange={handleEditedTypesChange}
                    defaultValue={
                      pokemon.types[1]?.type.name
                        ? pokemon.types[1]?.type.name
                        : "normal"
                    }
                  >
                    {allTypes.map((type: any) => (
                      <option
                        key={type.name}
                        value={type.name}
                        disabled={type.name === firstEditedType}
                      >
                        {type.name}
                      </option>
                    ))}
                    <option value="none">none</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className={styles["card__footer"]}>
            <button onClick={handleSubmitEditForm}>Edit</button>
          </div>
        </>
      ) : (
        <>
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
            <button
              className={styles["action-button"]}
              onClick={handleChangeIsEditing}
            >
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
                if (type.type.name !== "none") {
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
            <Link
              className={styles["more-link"]}
              href={`/pokemon/${pokemon.name}`}
            >
              View Details
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
