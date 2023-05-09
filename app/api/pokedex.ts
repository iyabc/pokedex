import axios from "axios";

const getAllPokemons = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    // console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const getPokemonDetailsByName = async (name: string) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllPokemons, getPokemonDetailsByName };
