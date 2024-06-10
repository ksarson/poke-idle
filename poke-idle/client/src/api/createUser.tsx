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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    console.log("User Created Successfully:", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating account:", error.message);
      return { message: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { message: "An unexpected error occurred." };
    }
  }
};

export default createUser;
