import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import NoteCardDark from "./NoteCardDark";
import { Typography, CircularProgress, Stack, Pagination } from "@mui/material";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");
let myUser = {};
let likedNotes = [];
if (token) {
  myUser = jwt_decode(localStorage.getItem("token"));
  const fetchLikedNotes = async () => {
    let url = `https://localhost:8080/api/kudos/id?id=${myUser.Id}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        likedNotes = json;
      })
      .catch((error) => console.error(error));
  };

  fetchLikedNotes();
}

function ResponsiveGrid({
  searchQuery,
  setSearchQuery,
  setLevel,
  SetKeyword,
  SetAssessment,
  page,
  setPage,
}) {
  const [data, setData] = useState();

  const [totalPageNumber, setTotalPageNumber] = useState(1);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://localhost:8080/api/notes/search?";
      if (searchQuery[0] != "") {
        url = url + `keyword=${searchQuery[0]}`;
      }
      if (searchQuery[1] != "") {
        url = url + `&level=${searchQuery[1]}`;
      }
      if (searchQuery[2] != "") {
        url = url + `&assessment=${searchQuery[2]}`;
      }
      url = url + `&startIndex=${6 * [page - 1]}&endIndex=${6 * page - 1}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setTotalPageNumber(json[0]);
          setData(json[1]);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [searchQuery, page]);

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
            <NoteCardDark
              key={i.note_ID}
              setLevel={setLevel}
              setKeyword={SetKeyword}
              item={i}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setAssessment={SetAssessment}
              setPage={setPage}
              isLiked={likedNotes.includes(i.note_ID)}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalPageNumber / 6)}
        size="large"
        color="primary"
        showFirstButton
        showLastButton
        page={page}
        onChange={handlePagination}
        sx={{
          mt: 5,
          position: "fixed",
          bottom: "3vh",
          left: "50%",
        }}
      />
    </Box>
  );
}

export default ResponsiveGrid;
