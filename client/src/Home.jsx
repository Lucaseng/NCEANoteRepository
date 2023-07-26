import React, { useState } from "react";
import { Container, Typography, Divider, Pagination } from "@mui/material/";
import ResponsiveGrid from "./Components/ResponsiveGrid";
import Search from "./Components/Search";
import { useEffect } from "react";
function Home({
  user,
  accountChange,
  setAccountChange,
  setUser,
  setMessage,
  setOpen,
}) {
  const [searchQuery, setSearchQuery] = useState(["", "", ""]);
  const [level, setLevel] = useState("");
  const [keyword, SetKeyword] = React.useState("");
  const [assessment, SetAssessment] = React.useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearchQuery(["", "", ""]);
  }, []);

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
          page={page}
          setPage={setPage}
        />
        <Divider sx={{ mb: 5 }} />
        <ResponsiveGrid
          setLevel={setLevel}
          SetKeyword={SetKeyword}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          SetAssessment={SetAssessment}
          page={page}
          setPage={setPage}
          user={user}
          accountChange={accountChange}
          setAccountChange={setAccountChange}
          setUser={setUser}
          setMessage={setMessage}
          setOpen={setOpen}
        />
      </Container>
    </>
  );
}

export default Home;
