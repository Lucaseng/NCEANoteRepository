import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function NoteCardDark(props) {
  const { item } = props;

  return (
    <>
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
          <Stack justifyContent="space-between" direction="row" sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                  },
                }}
                onClick={() => {}}
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
                onClick={() => {}}
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
                onClick={() => {}}
                label={`AS${item.standard.standard_ID}`}
                variant="outlined"
              />
            </Stack>

            <Stack direction="row" spacing={1}>
              <Chip
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
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
            {"Authored by: " + item.user.first_Name + " " + item.user.last_Name}
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
              sx={{
                color: "#fff",
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
    </>
  );
}

export default NoteCardDark;
