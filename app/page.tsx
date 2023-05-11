"use client";
import { useEffect } from "react";
import Home from "./home/page";
import {
  fetchAllPokemonAbilitiesFromApi,
  fetchAllPokemonTypesFromApi,
  fetchAllPokemonsFromApi,
} from "./api/api_to_local";

const Page = () => {
  useEffect(() => {
    localStorage.clear();
    fetchAllPokemonsFromApi();
    fetchAllPokemonTypesFromApi();
    fetchAllPokemonAbilitiesFromApi();
  }, []);

  // if (typeof localStorage !== "undefined") {
  //   console.log(localStorage);
  // } else {
  //   console.log("localStorage is not available");
  // }

  return (
    <>
      <Home />
    </>
  );
};

export default Page;
