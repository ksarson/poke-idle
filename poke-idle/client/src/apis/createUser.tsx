import axios from "axios";

const createUser = async (username: string, password: string) => {
  try {
    console.log("Creating User...");
    const response = await axios.post(
      "http://localhost:3000/api/users/create",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
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
