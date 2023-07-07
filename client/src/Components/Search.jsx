import React from "react";
import {
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Search({ setSearchQuery }) {
  const [level, SetLevel] = React.useState("");
  const [assessment, SetAssessment] = React.useState("");
  const [keyword, SetKeyword] = React.useState("");

  const handleChange = (event) => {
    SetLevel(event.target.value);
  };

  const handleAssessmentChange = (event) => {
    SetAssessment(event.target.value);
  };

  const handleInputChange = (event) => {
    SetKeyword(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Stack width="40vw">
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
          <FormControl sx={{ mt: 1.2, minWidth: "20%" }} size="small">
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
        </Stack>
      </Stack>
    </>
  );
}

export default Search;
