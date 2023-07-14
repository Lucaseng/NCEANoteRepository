import { useState, useEffect } from "react";
import AuthContext from "./AuthContext.js";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserPromise(token)
        .then((response) => response.json())
        .then((json) => {
          if (json.fail) {
            alert(json.fail);
          } else {
            //console.log(json);

            setUser(json);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const getUserPromise = (token) => {
    return fetch(import.meta.env.VITE_APP_API_URL + "/api/users/me", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  const checkUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
