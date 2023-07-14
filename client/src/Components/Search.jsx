import React from "react";
import {
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Search({
  setSearchQuery,
  searchQuery,
  level,
  setLevel,
  keyword,
  SetKeyword,
  assessment,
  SetAssessment,
  page,
  setPage,
}) {
  const handleChange = (event) => {
    setLevel(event.target.value);
    let searchQuery2 = [...searchQuery];
    searchQuery2[1] = event.target.value;
    setSearchQuery(searchQuery2);
    setPage(1);
  };

  const handleAssessmentChange = (event) => {
    SetAssessment(event.target.value);
    let searchQuery2 = [...searchQuery];
    searchQuery2[2] = event.target.value;
    setSearchQuery(searchQuery2);
    setPage(1);
  };

  const handleInputChange = (event) => {
    SetKeyword(event.target.value);
    let searchQuery2 = [...searchQuery];
    searchQuery2[0] = event.target.value;
    setSearchQuery(searchQuery2);
    setPage(1);
  };

  const handleReset = (event) => {
    SetKeyword("");
    SetAssessment("");
    setLevel("");
    setSearchQuery(["", "", ""]);
    setPage(1);
  };

  return (
    <>
      <Stack sx={{ width: { xs: "75vw", md: "60vw" } }}>
        <TextField
          value={keyword}
          onChange={(e) => handleInputChange(e)}
          placeholder="Keywords"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          id="outlined-basic"
          label="Search Notes"
          variant="outlined"
        />
        <Stack direction="row" sx={{ pt: 0.5, pb: 3 }}>
          <FormControl sx={{ mt: 1.2, mr: 1.2, minWidth: "90px" }} size="small">
            <InputLabel id="demo-select-medium-label">Level</InputLabel>
            <Select
              labelId="demo-select-medium-label"
              value={level}
              label="Level"
              onChange={handleChange}
              sx={{ borderRadius: "40px" }}
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={"Scholarship"}>Scholarship</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 1.2, mr: 1.2, minWidth: "10em" }} size="small">
            <InputLabel id="ass-label">Assessment</InputLabel>
            <Select
              labelId="ass-label"
              value={assessment}
              label="Assessment"
              onChange={handleAssessmentChange}
              sx={{ borderRadius: "40px" }}
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              <MenuItem value={"Internal"}>Internal</MenuItem>
              <MenuItem value={"External"}>External</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 1.2 }}>
            <Button
              onClick={handleReset}
              sx={{ borderRadius: "40px", pt: 1.2 }}
              variant="outlined"
            >
              Reset
            </Button>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
}

export default Search;
