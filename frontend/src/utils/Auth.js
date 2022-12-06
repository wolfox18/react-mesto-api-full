import { checkResponce } from "./utils";
import { BASE_URL } from "./utils";

function request(url, options){
  return fetch(url, options).then(checkResponce);
}

export const register = (password, email) => {
  return request(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
};

export const authorise = (password, email) => {
  return request(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
};

export const getUserEmail = (token) => {
  return request(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
};
