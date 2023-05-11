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
  stats: Stat[];
};

type Type = {
  name: string;
};

type Ability = {
  name: string;
};

type Stat = {
  base_stat: number;
  name: string;
};
