import React, { useState } from "react";
import { Container, Typography, Divider } from "@mui/material/";
import ResponsiveGrid from "./Components/ResponsiveGrid";
import Search from "./Components/Search";
function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ pb: 3, fontWeight: "medium" }}>
          Note Gallery
        </Typography>
        <Search setSearchQuery={setSearchQuery} />
        <Divider sx={{ mb: 5 }} />
        <ResponsiveGrid searchQuery={searchQuery} />
      </Container>
    </>
  );
}

export default Home;
