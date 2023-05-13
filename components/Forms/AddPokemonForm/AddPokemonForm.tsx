import { FormEventHandler, ChangeEventHandler } from "react";
import styles from "./AddPokemonForm.module.css";

const AddPokemonForm = ({
  types,
  abilities,
  stats,
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
  handleHpOnChange,
  handleAttackOnChange,
  handleDefenseOnChange,
  handleSpecialAttackOnChange,
  handleSpecialDefenseOnChange,
  handleSpeedOnChange,
  handleOnSubmit,
}: {
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
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
  handleHpOnChange: ChangeEventHandler<HTMLInputElement>;
  handleAttackOnChange: ChangeEventHandler<HTMLInputElement>;
  handleDefenseOnChange: ChangeEventHandler<HTMLInputElement>;
  handleSpecialAttackOnChange: ChangeEventHandler<HTMLInputElement>;
  handleSpecialDefenseOnChange: ChangeEventHandler<HTMLInputElement>;
  handleSpeedOnChange: ChangeEventHandler<HTMLInputElement>;
  handleOnSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  const handleStringChange = (
    str: string
  ): ChangeEventHandler<HTMLInputElement> => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      console.log(str + ": " + event.target.value);
    };
    return handleChange;
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.input}
          name="name"
          id="name"
          type="text"
          onChange={handleNameOnChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Weight</label>
        <input
          className={styles.input}
          name="weight"
          id="weight"
          type="number"
          onChange={handleWeightOnChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Height</label>
        <input
          className={styles.input}
          name="height"
          id="height"
          type="number"
          onChange={handleHeightOnChange}
        />
      </div>
      {/* might be moved to a diff component */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Types</label>
        <select
          name="firstType"
          id="firstType"
          onChange={handleTypesOnChange}
          defaultValue="none"
        >
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
          defaultValue="none"
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
      {/* might be moved to a diff component */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Abilities</label>
        <select
          name="firstAbility"
          id="firstAbility"
          onChange={handleAbilitiesOnChange}
          defaultValue="none"
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
          defaultValue="none"
        >
          {abilities?.map((ability: Ability) => {
            return (
              <option key={ability.name} disabled={ability.name === firstType}>
                {ability.name}
              </option>
            );
          })}
          <option value="none">none</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        {stats?.map((stat) => {
          const convertedStatName = stat.name.replace(
            /-([a-z])/g,
            function (match, letter) {
              return letter.toUpperCase();
            }
          );
          const convertedStatNameForSetter = stat.name
            .replace(/-/g, " ")
            .replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase();
            })
            .replace(/\s+/g, "");

          return (
            <label key={stat.name} className={styles.inputLabel}>
              {stat.name.replace("-", " ")}
              <input
                name={convertedStatName}
                id={convertedStatName}
                onChange={handleStringChange(
                  `handle${convertedStatNameForSetter}OnChange`
                )}
                type="number"
                min={0}
                max={100}
              />
            </label>
          );
        })}
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPokemonForm;
