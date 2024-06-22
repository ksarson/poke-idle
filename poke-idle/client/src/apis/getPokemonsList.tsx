import axios from "axios";

const getPokemonsList = async () => {
  try {
    console.log("Fetching pokemon list from server...");
    const response = await axios.get("http://localhost:3000/api/pokemon/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    sessionStorage.setItem("pokemonList", JSON.stringify(data));
    console.log("Pokemon list fetched successfully:", data);
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
  }
};

export default getPokemonsList;
