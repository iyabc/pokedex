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
  type: { name: string };
};

type Ability = {
  ability: {
    name: string;
  };
};

type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};
