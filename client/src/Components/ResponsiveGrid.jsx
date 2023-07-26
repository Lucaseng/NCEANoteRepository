import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import NoteCardDark from "./NoteCardDark";
import {
  Typography,
  CircularProgress,
  Stack,
  Pagination,
  ThemeProvider,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import useAuthContext from "../auth/useAuthContext";
import { createTheme } from "@mui/material/styles";

const token = localStorage.getItem("token");
let myTokenUser = "";
if (token) myTokenUser = jwt_decode(token);

function ResponsiveGrid({
  searchQuery,
  setSearchQuery,
  setLevel,
  SetKeyword,
  SetAssessment,
  page,
  setPage,
  setMessage,
  setOpen,
  user,
}) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
        custom: 850,
      },
    },
  });
  const [likedNotes, setLikedNotes] = useState([]);
  const [data, setData] = useState();
  const [myToken, setMyToken] = useState(localStorage.getItem("token"));

  const [totalPageNumber, setTotalPageNumber] = useState(1);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      const fetchLikedNotes = async () => {
        let url = `https://mydeployncea.azurewebsites.net/api/kudos/id?id=${user.user_ID}`;

        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            setLikedNotes(json);
          })
          .catch((error) => console.error(error));
      };

      fetchLikedNotes();
    }
    if (!user) {
      setLikedNotes([]);
    }
    setData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      //let url = import.meta.env.VITE_APP_API_URL + "/api/notes/search?";
      let url = import.meta.env.VITE_APP_API_URL + "/api/notes/search?";
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
  }, [searchQuery, page, user]);

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

  if (localStorage.getItem("token")) {
    return (
      <Box flex={1}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 450px)"
          flexDirection="row"
          flexWrap="wrap"
          gap="1vw"
          sx={{ justifyContent: "center" }}
        >
          {data.map((i, index) => (
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
              setMessage={setMessage}
              setOpen={setOpen}
            />
          ))}
        </Box>

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
            display: "flex",
            justifyContent: "center",
            pb: 5,
          }}
        />
      </Box>
    );
  } else {
    return (
      <Box flex={1}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 450px)"
          flexDirection="row"
          flexWrap="wrap"
          gap="1vw"
          sx={{ justifyContent: "center" }}
        >
          {data.map((i, index) => (
            <NoteCardDark
              key={i.note_ID}
              setLevel={setLevel}
              setKeyword={SetKeyword}
              item={i}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setAssessment={SetAssessment}
              setPage={setPage}
              isLiked={false}
              setMessage={setMessage}
              setOpen={setOpen}
            />
          ))}
        </Box>

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
            display: "flex",
            justifyContent: "center",
            //position: "fixed",
            pb: 5,
            //left: "50%",
          }}
        />
      </Box>
    );
  }
}

export default ResponsiveGrid;
