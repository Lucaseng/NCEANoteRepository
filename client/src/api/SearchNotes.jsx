import React, { useState, useEffect } from "react";

function SearchNotes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API_URL + "/api/notes/searchAsync")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}

export default SearchNotes;
