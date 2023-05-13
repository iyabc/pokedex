type BasicPokemon = {
  id: number;
  name: string;
  types: Type[];
};

type DetailedPokemon = {
  id: number;
  name: string;
  details: Details;
};

type Details = {
  weight: number;
  height: number;
  types: Type[];
  abilities: Ability[];
  stats: Stats;
};

type Type = {
  name: string;
};

type Ability = {
  name: string;
};

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  // accuracy: number;
  // evasion: number;
};

type Stat = {
  name: string;
};
