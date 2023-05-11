import { FormEventHandler, ChangeEventHandler } from "react";
import styles from "./AddPokemonForm.module.css";

const AddPokemonForm = ({
  types,
  abilities,
  name,
  weight,
  height,
  firstType,
  secondType,
  firstAbility,
  secondAbility,
  handleNameOnChange,
  handleWeightOnChange,
  handleHeightOnChange,
  handleTypesOnChange,
  handleAbilitiesOnChange,
  handleOnSubmit,
}: {
  types: Type[];
  abilities: Ability[];
  name: string;
  weight: number;
  height: number;
  firstType: string;
  secondType: string;
  firstAbility: string;
  secondAbility: string;
  handleNameOnChange: ChangeEventHandler<HTMLInputElement>;
  handleWeightOnChange: ChangeEventHandler<HTMLInputElement>;
  handleHeightOnChange: ChangeEventHandler<HTMLInputElement>;
  handleTypesOnChange: ChangeEventHandler<HTMLSelectElement>;
  handleAbilitiesOnChange: ChangeEventHandler<HTMLSelectElement>;
  handleOnSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          onChange={handleNameOnChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Weight</label>
        <input
          name="weight"
          id="weight"
          type="number"
          onChange={handleWeightOnChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Height</label>
        <input
          name="height"
          id="height"
          type="number"
          onChange={handleHeightOnChange}
        />
      </div>
      {/* might be move to a diff component */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Types</label>
        <select name="firstType" id="firstType" onChange={handleTypesOnChange}>
          {types?.map((type: Type) => {
            return (
              <option key={type.name} disabled={type.name === secondType}>
                {type.name}
              </option>
            );
          })}
          <option value="none">none</option>
        </select>
        <select
          name="secondType"
          id="secondType"
          onChange={handleTypesOnChange}
        >
          {types?.map((type: Type) => {
            return (
              <option key={type.name} disabled={type.name === firstType}>
                {type.name}
              </option>
            );
          })}
          <option value="none">none</option>
        </select>
      </div>
      {/* might be move to a diff component */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Abilities</label>
        <select
          name="firstAbility"
          id="firstAbility"
          onChange={handleAbilitiesOnChange}
        >
          {abilities?.map((ability: Ability) => {
            return (
              <option key={ability.name} disabled={ability.name === secondType}>
                {ability.name}
              </option>
            );
          })}
          <option value="none">none</option>
        </select>
        <select
          name="secondAbility"
          id="secondAbility"
          onChange={handleAbilitiesOnChange}
        ></select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPokemonForm;
