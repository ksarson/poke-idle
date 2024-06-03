const fetchPokemonsList = async () => {
  try {
    console.log("Fetching pokemon list from server...");
    const response = await fetch("http://localhost:3000/api/pokemon/list");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pokemon list fetched successfully:", data);
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
  }
};

export default fetchPokemonsList;
