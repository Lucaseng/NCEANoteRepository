import React from "react";
import { Container, Typography, Divider } from "@mui/material/";
import Drawer from "./Components/Drawer";
import NoteCard from "./Components/NoteCard";
import NoteCardDark from "./Components/NoteCardDark";
import ResponsiveGrid from "./Components/ResponsiveGrid";
import Search from "./Components/Search";
function Home(props) {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ pb: 3, fontWeight: "medium" }}>
          Note Gallery
        </Typography>
        <Search />
        <Divider sx={{ mb: 5 }} />
        <ResponsiveGrid />
      </Container>
    </>
  );
}

export default Home;
