import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Link,
  Autocomplete,
  Divider,
} from "@mui/material/";

function Upload() {
  const [subjects, setSubjects] = useState([]);
  const [standards, setStandards] = useState([]);
  const [levelDisabled, setLevelDisabled] = useState(true);
  const [standardDisabled, setStandardDisabled] = useState(true);
  const [subject, setSubject] = useState();
  const [standard, setStandard] = useState();
  const [level, setLevel] = useState(false);

  const handleSubjectChange = (e) => {
    if (e.target.innerText) {
      setLevelDisabled(false);
      setSubject(e.target.innerText);
    } else {
      setStandard();
      setLevelDisabled(true);
      setStandardDisabled(true);
    }
  };

  const handleLevelChange = (e) => {
    const myNumber = e.target.innerText;
    if (e.target.textContent) {
      setStandardDisabled(false);
      let url = `https://localhost:8080/api/standards/search?subject=${subject}&level=${myNumber}`;
      fetchStandards(url);
    } else {
      setStandard();
      setStandardDisabled(true);
    }
  };

  const handleStandardChange = (e) => {
    if (e.target.innerText) {
      setStandard(e.target.innerText);
    } else {
      setStandard();
    }
  };

  const fetchSubjects = async () => {
    let url = "https://localhost:8080/api/subjects";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.fail) {
          alert(json.fail);
        } else {
          let subArr = [];
          json.forEach((obj) => {
            subArr.push(obj["subject_name"]);
          });
          setSubjects(subArr);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchStandards = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.fail) {
          alert(json.fail);
        } else {
          let standardArr = [];

          json.forEach((obj) => {
            standardArr.push(obj["title"] + ` (AS${obj["standard_ID"]})`);
          });
          setStandards(standardArr);
        }
      })
      .catch((error) => console.error(error));
  };

  fetchSubjects();

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", mt: 3 }}
    >
      <Typography variant="h4" sx={{ pb: 3, fontWeight: "medium" }}>
        Upload a Note
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
          <Autocomplete
            disablePortal
            name="subject"
            onInputChange={handleSubjectChange}
            options={subjects}
            sx={{ width: "50vw", mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter a Subject:" />
            )}
          />
          <Autocomplete
            disablePortal
            disabled={levelDisabled}
            name="level"
            onInputChange={handleLevelChange}
            options={["1", "2", "3", "Scholarship"]}
            sx={{ width: "50vw", mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter a Level:" />
            )}
          />
          <Autocomplete
            disablePortal
            onInputChange={handleStandardChange}
            disabled={standardDisabled}
            name="standard"
            options={standards}
            sx={{ width: "50vw", mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Pick a standard:" />
            )}
          />
          <Button
            onSubmit={(e) => {
              e.preventDefault;
            }}
            href="#"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Upload Note
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Upload;
