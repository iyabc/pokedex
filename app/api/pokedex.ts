import axios from "axios";

const apiUrl: string = "https://pokeapi.co/api/v2/";

const getAllPokemons = async () => {
  try {
    const response = await axios.get(`${apiUrl}pokemon?limit=1281&offset=0`);
    // console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const getPokemonsByPagination = async (page: number) => {
  const actualPage = 6 * (page - 1);
  try {
    const response = await axios.get(
      `${apiUrl}pokemon?limit=6&offset=${actualPage}`
    );
    // console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const getPokemonDetailsByName = async (name: string) => {
  try {
    const response = await axios.get(`${apiUrl}pokemon/${name}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllPokemonTypes = async () => {
  try {
    const response = await axios.get(`${apiUrl}type`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const getAllPokemonAbilities = async () => {
  try {
    const response = await axios.get(`${apiUrl}ability`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const getAllPokemonStats = async () => {
  try {
    const result = await axios.get(`${apiUrl}stat`);
    return result.data.results;
  } catch (error) {
    throw error;
  }
};

export {
  getAllPokemons,
  getPokemonsByPagination,
  getPokemonDetailsByName,
  getAllPokemonTypes,
  getAllPokemonAbilities,
  getAllPokemonStats,
};
