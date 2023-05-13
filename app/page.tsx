"use client";
import { useEffect } from "react";
import Home from "./home/page";
import { fetchAllPokemonsFromApi } from "./api/api_to_local";

const Page = () => {
  useEffect(() => {
    const allPokemonsArray = localStorage.getItem("allPokemonsArray");
    if (!allPokemonsArray) {
      fetchAllPokemonsFromApi();
    }
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default Page;
