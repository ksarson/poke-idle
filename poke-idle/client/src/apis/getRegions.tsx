const getRegions = async () => {
  try {
    console.log("Fetching regions from server...");
    const response = await fetch("http://localhost:3000/api/regions/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    sessionStorage.setItem("regions", JSON.stringify(data));
    console.log("Regions fetched successfully:", data);
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
};

export default getRegions;
