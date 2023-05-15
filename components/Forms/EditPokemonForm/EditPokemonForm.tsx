import { MouseEvent, ChangeEvent } from "react";
import styles from "../Form.module.css";
import MainButton from "@/components/Buttons/MainButton/MainButton";

const EditPokemonForm = ({
  pokemon,
  types,
  abilities,
  firstType,
  secondType,
  firstAbility,
  secondAbility,
  handleNameOnChange,
  handleWeightOnChange,
  handleHeightOnChange,
  handleTypesOnChange,
  handleAbilitiesOnChange,
  handleStatsOnChange,
  handleSubmitOnClick,
}: {
  pokemon: DetailedPokemon;
  types: Type[];
  abilities: Ability[];
  firstType: string;
  secondType: string;
  firstAbility: string;
  secondAbility: string;
  handleNameOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWeightOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleHeightOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTypesOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleAbilitiesOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleStatsOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <form className={styles.form}>
      <div className={styles.input_container}>
        <div className={styles.form_group}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={pokemon.name}
            onChange={handleNameOnChange}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            defaultValue={pokemon.details?.weight}
            onChange={handleWeightOnChange}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            name="height"
            defaultValue={pokemon.details?.height}
            onChange={handleHeightOnChange}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="types">Types</label>
          <select
            name="firstType"
            id="firstType"
            onChange={handleTypesOnChange}
          >
            <option value={pokemon.details.types[0]?.name} selected>
              {pokemon.details.types[0]?.name}
            </option>
            {types?.map((type: Type) => {
              return (
                <option
                  key={type.name}
                  disabled={type.name === secondType}
                  value={type.name}
                >
                  {type.name}
                </option>
              );
            })}
            <option value="none" selected={!pokemon.details.types[0]?.name}>
              none
            </option>
          </select>
          <select
            name="secondType"
            id="secondType"
            onChange={handleTypesOnChange}
          >
            <option value={pokemon.details.types[1]?.name} selected>
              {pokemon.details.types[1]?.name}
            </option>
            {types?.map((type: Type) => {
              return (
                <option key={type.name} disabled={type.name === firstType}>
                  {type.name}
                </option>
              );
            })}
            <option value="none" selected={!pokemon.details.types[1]?.name}>
              none
            </option>
          </select>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="abilities">Abilities</label>
          <select
            name="firstAbility"
            id="firstAbility"
            onChange={handleAbilitiesOnChange}
          >
            <option value={pokemon.details.abilities[0]?.name} selected>
              {pokemon.details.abilities[0]?.name}
            </option>
            {abilities?.map((ability: Ability) => {
              return (
                <option
                  key={ability.name}
                  disabled={ability.name === secondAbility}
                  value={ability.name}
                >
                  {ability.name}
                </option>
              );
            })}
            <option value="none" selected={!pokemon.details.abilities[0]?.name}>
              none
            </option>
          </select>
          <select
            name="secondAbility"
            id="secondAbility"
            onChange={handleAbilitiesOnChange}
          >
            <option value={pokemon.details.abilities[1]?.name} selected>
              {pokemon.details.abilities[1]?.name}
            </option>
            {abilities?.map((ability: Ability) => {
              // const selected =
              //   ability.name === pokemon.details.abilities[1]?.name;
              return (
                <option
                  key={ability.name}
                  disabled={ability.name === firstAbility}
                  value={ability.name}
                  // selected={selected}
                >
                  {ability.name}
                </option>
              );
            })}
            <option value="none" selected={!pokemon.details.abilities[1]?.name}>
              none
            </option>
          </select>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="hp">HP</label>
          <input
            type="number"
            name="hp"
            onChange={handleStatsOnChange}
            defaultValue={pokemon.details.stats.hp}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="attack">Attack</label>
          <input
            type="number"
            name="attack"
            onChange={handleStatsOnChange}
            defaultValue={pokemon.details.stats.attack}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="defense">defense</label>
          <input
            type="number"
            name="defense"
            onChange={handleStatsOnChange}
            defaultValue={pokemon.details.stats.defense}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="specialAttack">special attack</label>
          <input
            type="number"
            name="specialAttack"
            onChange={handleStatsOnChange}
            defaultValue={pokemon.details.stats.specialAttack}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="specialDefense">special defense</label>
          <input
            type="number"
            name="specialDefense"
            onChange={handleStatsOnChange}
            defaultValue={pokemon.details.stats.specialDefense}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="speed">speed</label>
          <input
            type="number"
            name="speed"
            onChange={handleStatsOnChange}
            defaultValue={pokemon.details.stats.speed}
          />
        </div>
      </div>
      <div className={styles.submit_button_container}>
        <MainButton
          text="Submit"
          isSubmit={true}
          handleClick={handleSubmitOnClick}
        />
      </div>
    </form>
  );
};

export default EditPokemonForm;
