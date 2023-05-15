"use client";
import { useEffect } from "react";
import Home from "./home/page";
import { fetchAllPokemonsFromApi } from "./api/api_to_local";

const Page = () => {
  useEffect(() => {
    const allPokemonsString = localStorage.getItem("allPokemonsArray");
    if (!allPokemonsString) {
      console.log("fetch");
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
