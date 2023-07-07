import React, { useState, useEffect } from "react";

function SearchNotes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://localhost:8080/api/notes/search")
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
