// lib/auth.js
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true; // No token means expired

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds

  // Check if the token expiration time is less than the current time
  return decodedToken.exp < currentTime;
};
