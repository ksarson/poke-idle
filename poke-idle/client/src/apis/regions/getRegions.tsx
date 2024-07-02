import axios from "axios";

const getRegions = async () => {
  try {
    console.log("Fetching regions from server...");
    const response = await axios.get("http://localhost:3000/api/regions/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    sessionStorage.setItem("regions", JSON.stringify(data));
    console.log("Regions fetched successfully:", data);
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
};

export default getRegions;
