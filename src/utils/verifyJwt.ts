import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken?.exp && decodedToken?.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
