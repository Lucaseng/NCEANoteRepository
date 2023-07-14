import React, { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material/";
import NoteCardDark from "./Components/NoteCardDark";
import { fetchCurrentUser } from "./auth/authHandler";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./auth/useAuthContext";

const token = localStorage.getItem("token");
let myUser = {};
if (token) {
  myUser = jwt_decode(localStorage.getItem("token"));
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export default function Upload({
  user,
  setUser,
  setMessage,
  setOpen,
  handleClose,
}) {
  const navigate = useNavigate();
  const myUser = useAuthContext();
  const [levels, setLevels] = useState(["1", "2", "3", "Scholarship"]);
  const [subjects, setSubjects] = useState([]);
  const [standards, setStandards] = useState([]);
  const [levelDisabled, setLevelDisabled] = useState(true);
  const [standardDisabled, setStandardDisabled] = useState(true);
  const [value, setValue] = React.useState(null);
  const [levelValue, setLevelValue] = React.useState(null);
  const [standardValue, setStandardValue] = React.useState(null);
  const [sampleNote, setSampleNote] = useState({
    file: "",
    file_Name: "",
    kudos: 0,
    standard: {
      standard_ID: "",
      title: "",
      credits: "",
      assessment: "",
      level: "",
      subject: {
        subject_name: "",
      },
    },
    user: {
      first_Name: "",
      last_Name: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      let url = import.meta.env.VITE_APP_API_URL + "/api/subjects";

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

    fetchSubjects();

    let mySamp = sampleNote;
    let jwt = jwt_decode(localStorage.getItem("token"));
    mySamp.user = {
      first_Name: jwt.First_Name,
      last_Name: jwt.Last_Name,
      email: jwt.Email,
    };
    setSampleNote({ ...mySamp });
  }, []);

  const fetchStandards = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.fail) {
          alert(json.fail);
        } else {
          let standardArr = [];

          json.forEach((obj) => {
            standardArr.push({
              title: obj["title"] + ` (AS${obj["standard_ID"]})`,
              standard_ID: obj["standard_ID"],
            });
          });

          setStandards(standardArr);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchStandardInfo = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.fail) {
          alert(json.fail);
        } else {
          let mySamp = sampleNote;
          mySamp.standard = json;
          setSampleNote({ ...mySamp });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", mt: 3 }}
    >
      <Typography variant="h4" sx={{ pb: 3, fontWeight: "medium" }}>
        Note Builder
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
        {" "}
        <Box
          width="50vw"
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !sampleNote.standard.standard_ID ||
              !e.target.link.value ||
              !e.target.title.value
            ) {
              setMessage(
                <Alert severity="error" onClose={handleClose}>
                  Please complete the entire form!
                </Alert>
              );
              setOpen(true);
              return;
            } else if (!isValidUrl(e.target.link.value)) {
              setMessage(
                <Alert severity="error" onClose={handleClose}>
                  The link you have entered is not valid!
                </Alert>
              );
              setOpen(true);
              return;
            }
            const fetchData = async () => {
              let url = import.meta.env.VITE_APP_API_URL + "/api/notes";

              fetch(url, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ` + token,
                },
                body: JSON.stringify({
                  standard_ID: sampleNote.standard.standard_ID,
                  user_ID: myUser.Id,
                  file: e.target.link.value,
                  file_Name: e.target.title.value,
                }),
              })
                .then((response) => response.json())
                .then(async (json) => {
                  if (json.fail) {
                    setMessage(
                      <Alert severity="error" onClose={handleClose}>
                        {`Note creation failed - ${json.fail}`}
                      </Alert>
                    );
                  } else {
                    setMessage(
                      <Alert severity="success" onClose={handleClose}>
                        Note created succesfully!
                      </Alert>
                    );

                    navigate("/");
                  }
                  setOpen(true);
                })
                .catch((error) => {
                  setMessage(
                    <Alert severity="error" onClose={handleClose}>
                      {`Note creation failed - ${error}`}
                    </Alert>
                  );
                  setOpen(true);
                });
            };

            fetchData();
          }}
          noValidate
          sx={{
            mt: 1,
          }}
        >
          <Autocomplete
            id="subject"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setLevelValue(null);
              setStandardValue(null);

              if (newValue) {
                setLevelDisabled(false);
              } else {
                setLevelDisabled(true);
                setStandardDisabled(true);
              }
              let mySamp = sampleNote;
              mySamp.standard.subject.subject_name = newValue;
              mySamp.standard.level = "";
              mySamp.standard.standard_ID = "";
              mySamp.standard.title = "";
              mySamp.standard.credits = "";
              mySamp.standard.assessment = "";

              setSampleNote({ ...mySamp });
            }}
            options={subjects}
            sx={{ width: "50vw", mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter a Subject:" />
            )}
          />
          <Autocomplete
            id="level"
            disabled={levelDisabled}
            value={levelValue}
            onChange={(event, newValue) => {
              setLevelValue(newValue);
              setStandardValue(null);

              fetchStandards(
                `https://mydeployncea.azurewebsites.net/api/standards/search?subject=${value}&level=${newValue}`
              );

              let mySamp = sampleNote;

              if (newValue) {
                setStandardDisabled(false);
                mySamp.standard.level = newValue;
              } else {
                setStandardDisabled(true);
                mySamp.standard.level = "";
                mySamp.standard.standard_ID = "";
                mySamp.standard.title = "";
                mySamp.standard.credits = "";
                mySamp.standard.assessment = "";
              }

              setSampleNote({ ...mySamp });
            }}
            sx={{ width: "50vw", mb: 3 }}
            options={levels}
            renderInput={(params) => (
              <TextField {...params} label="Enter a Level:" />
            )}
          />
          <Autocomplete
            id="standard"
            disabled={standardDisabled}
            value={standardValue}
            onChange={(event, newValue) => {
              setStandardValue(newValue);
              let mySamp = sampleNote;
              if (newValue != null) {
                const index = newValue.lastIndexOf("(");
                const standard_id = newValue.substring(
                  index + 3,
                  newValue.length - 1
                );
                fetchStandardInfo(
                  `https://mydeployncea.azurewebsites.net/api/standards/id?Standard_ID=${standard_id}`
                );
              } else {
                mySamp.standard.level = "";
                mySamp.standard.standard_ID = "";
                mySamp.standard.title = "";
                mySamp.standard.credits = "";
                mySamp.standard.assessment = "";
              }
              setSampleNote({ ...mySamp });
            }}
            options={standards.map((s) => s.title)}
            sx={{ width: "50vw", mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter a Standard:" />
            )}
          />
          <TextField
            required
            fullWidth
            id="title"
            label="Note Title"
            name="title"
            sx={{ mb: 3 }}
            onChange={(e) => {
              let mySamp = sampleNote;
              mySamp.file_Name = e.target.value;
              setSampleNote({ ...mySamp });
            }}
          />
          <TextField
            required
            fullWidth
            type="url"
            id="link"
            placeholder="https://www.drive.google.com/myFile"
            defaultValue="https://"
            label="File Link URL"
            name="link"
            sx={{ mb: 3 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Upload Note
          </Button>
          <NoteCardDark
            setLevel={() => {}}
            setKeyword={() => {}}
            setSearchQuery={() => {}}
            searchQuery={[]}
            setAssessment={() => {}}
            setPage={() => {}}
            item={sampleNote}
            isLiked={false}
            key={sampleNote}
          />
        </Box>
      </Box>
    </Container>
  );
}
