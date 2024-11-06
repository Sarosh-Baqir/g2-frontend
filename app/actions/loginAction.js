import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    // Destructure both tokens from the response
    const { accessToken, refreshToken, user } = response.data;
    // Store both tokens in local storage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    return { accessToken, refreshToken, user };
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
