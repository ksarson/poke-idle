import axios from "axios";

const setPartnerPokemon = async (pokemonName: string, username: string) => {
  try {
    if (!pokemonName) {
      console.log("No Selected Pokemon.");
    }
    if (!username) {
      console.log("Not a logged in user.");
    }

    console.log(`Setting partner pokemon as '${pokemonName}' on server...`);
    const response = await axios.put(
      `http://localhost:3000/api/pokemon/partnerPokemon/update`,
      {
        pokemonName,
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.data;
    sessionStorage.setItem("playerInfo", JSON.stringify(data.playerInfo));
    sessionStorage.setItem(
      "partnerPokemon",
      JSON.stringify(data.partnerPokemon)
    );
    console.log("Partner pokemon set successfully:", data);
  } catch (error) {
    console.error("Error setting partner pokemon:", error);
  }
};

export default setPartnerPokemon;
