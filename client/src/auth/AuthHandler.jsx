const fetchCurrentUser = async (token) => {
  let url = "https://mydeployncea.azurewebsites.net/api/users/me";

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export { fetchCurrentUser };
