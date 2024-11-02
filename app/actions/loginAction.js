import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(token);
    return { token, user };
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      {
        name,
        email,
        password,
      }
    );

    const { user } = response.data;
    console.log("data received from backend pf signup");
    console.log(user);
    return { user };
  } catch (error) {
    throw new Error(error.response.data.message || "Signup failed");
  }
};
