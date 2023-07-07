import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import NoteCardDark from "./NoteCardDark";
import { Typography, CircularProgress, Stack } from "@mui/material";

function ResponsiveGrid({ searchQuery }) {
  const [data, setData] = useState();
  //const [searchQuery, setSearchQuery] = useState("/daily");

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        fetch(`https://localhost:8080/api/notes/search?keyword=${searchQuery}`)
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
      } else {
        fetch(`https://localhost:8080/api/notes/search`)
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [searchQuery]);

  if (!data) {
    return (
      <>
        <Stack sx={{ alignItems: "center" }}>
          {" "}
          <CircularProgress />
          <Typography sx={{ paddingTop: "20px" }}>
            Hold tight - This will only take a second!
          </Typography>
        </Stack>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 12 }}
      >
        {data.map((i, index) => (
          <Grid xs={3.9} sm={3.9} md={3.9} key={index}>
            <NoteCardDark key={i.note_ID} item={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ResponsiveGrid;
