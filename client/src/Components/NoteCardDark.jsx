import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
  Fade,
  Grow,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jwt_decode from "jwt-decode";

function NoteCardDark(props) {
  const {
    item,
    setSearchQuery,
    searchQuery,
    setLevel,
    setKeyword,
    setAssessment,
    setPage,
    isLiked,
  } = props;

  const [isLikedValue, setIsLikedValue] = useState(isLiked);

  const likedColours = {
    false: "#fff",
    true: "#2196f3",
  };

  const handleLevelClick = (event) => {
    const level = event.target.innerText;
    let myArr = [...searchQuery];
    if (level.length > 7) {
      myArr[1] = "Scholarship";
    } else {
      myArr[1] = level[level.length - 1];
    }
    setLevel(myArr[1]);
    setSearchQuery(myArr);
    setPage(1);
  };

  const handleLike = (event) => {
    if (isLikedValue) {
      setIsLikedValue(false);
    } else {
      setIsLikedValue(true);
    }
  };

  const handleSubjectClick = (event) => {
    const subject = event.target.innerText;
    let myArr = [...searchQuery];
    myArr[0] = subject;
    setKeyword(subject);
    setSearchQuery(myArr);
    setPage(1);
  };

  const handleStandardClick = (event) => {
    let standard = event.target.innerText;
    let myArr = [...searchQuery];
    myArr[0] = standard.substring(2);
    setKeyword(myArr[0]);
    setSearchQuery(myArr);
    setPage(1);
  };

  const handleAssClick = (event) => {
    let subject = event.target.innerText;
    let myArr = [...searchQuery];
    if (subject == "Ext") {
      subject = "External";
    } else {
      subject = "Internal";
    }
    myArr[2] = subject;
    setAssessment(subject);
    setSearchQuery(myArr);
    setPage(1);
  };

  return (
    <>
      <Grow in={true} timeout={1000}>
        <Card
          sx={{
            borderRadius: "10px",
            height: "270px",
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            backgroundColor: "#233044",
            boxShadow: 1,
            width: "450px",
            "&:hover": {
              boxShadow: 6,
              borderColor: "neutral.outlinedHoverBorder",
            },
            p: 1,
          }}
        >
          <CardContent>
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ mb: 3 }}
            >
              <Stack direction="row" spacing={1}>
                <Chip
                  key={item.standard.level}
                  onClick={(e) => handleLevelClick(e)}
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    },
                  }}
                  label={`Level ${item.standard.level}`}
                  variant="outlined"
                />
                <Chip
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    },
                  }}
                  onClick={(e) => handleSubjectClick(e)}
                  label={item.standard.subject.subject_name}
                  variant="outlined"
                />
                <Chip
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    },
                  }}
                  onClick={(e) => handleStandardClick(e)}
                  label={`AS${item.standard.standard_ID}`}
                  variant="outlined"
                />
              </Stack>

              <Stack direction="row" spacing={1}>
                <Chip
                  onClick={(e) => handleAssClick(e)}
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    },
                  }}
                  label={item.standard.assessment.substring(0, 3)}
                  variant="outlined"
                />
                <Chip
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                  }}
                  label={item.standard.credits}
                  variant="outlined"
                />
              </Stack>
            </Stack>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="div">
              {item.file_Name}
            </Typography>
            <Typography sx={{ color: "#FAF9F6" }}>
              {item.standard.title}
            </Typography>
            <Typography variant="body2">
              {"Authored by: " +
                item.user.first_Name +
                " " +
                item.user.last_Name}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            <Button
              href={item.file}
              target="_blank"
              variant="contained"
              size="small"
              endIcon={<FileDownloadIcon />}
            >
              Download Note
            </Button>

            <Stack
              sx={{
                alignItems: "center",
              }}
              direction="row"
            >
              <IconButton
                onClick={handleLike}
                sx={{
                  color: likedColours[isLikedValue],
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  },
                }}
              >
                <ThumbUpAltIcon />
              </IconButton>
              <Typography sx={{ mr: 2 }}>{item.kudos}</Typography>
            </Stack>
          </CardActions>
        </Card>
      </Grow>
    </>
  );
}

export default NoteCardDark;
