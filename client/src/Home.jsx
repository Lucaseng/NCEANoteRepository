import React, { useState } from "react";
import { Container, Typography, Divider } from "@mui/material/";
import ResponsiveGrid from "./Components/ResponsiveGrid";
import Search from "./Components/Search";
function Home(props) {
  const [searchQuery, setSearchQuery] = useState(["", "", ""]);
  const [level, setLevel] = useState("");
  const [keyword, SetKeyword] = React.useState("");
  const [assessment, SetAssessment] = React.useState("");
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ pb: 3, fontWeight: "medium" }}>
          Note Gallery
        </Typography>
        <Search
          keyword={keyword}
          SetKeyword={SetKeyword}
          level={level}
          setLevel={setLevel}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          assessment={assessment}
          SetAssessment={SetAssessment}
        />
        <Divider sx={{ mb: 5 }} />
        <ResponsiveGrid
          setLevel={setLevel}
          SetKeyword={SetKeyword}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          SetAssessment={SetAssessment}
        />
      </Container>
    </>
  );
}

export default Home;
