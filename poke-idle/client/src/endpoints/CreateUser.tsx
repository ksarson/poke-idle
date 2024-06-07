const createUser = async (username: string, password: string) => {
  try {
    console.log("Creating User...");

    const response = await fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User Created Successfully:", data);
  } catch (error) {
    console.error("Error Creating User:", error);
  }
};

export default createUser;
