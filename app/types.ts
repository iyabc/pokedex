type Pokemon = {
  name: string;
  url: string;
  id: number;
  details: Details;
};

type Details = {
  abilities: [Ability];
  types: [Type];
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type Type = {
  slot: number;
  type: { name: string; url: string };
};
