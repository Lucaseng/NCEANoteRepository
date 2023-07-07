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
  Fade,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function NoteCard(props) {
  const { item } = props;

  return (
    <>
      <Fade in={true} timeout={1000}>
        <Card
          sx={{ boxShadow: 2, maxWidth: "400px", "&:hover": { boxShadow: 3 } }}
        >
          <CardContent>
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ mb: 3 }}
            >
              <Stack direction="row" spacing={1}>
                <Chip
                  onClick={() => {}}
                  label={`Level ${item.standard.level}`}
                  variant="outlined"
                />
                <Chip
                  onClick={() => {}}
                  label={item.standard.subject.subject_name}
                  variant="outlined"
                />
                <Chip
                  onClick={() => {}}
                  label={`AS${item.standard.standard_ID}`}
                  variant="outlined"
                />
              </Stack>

              <Chip label={item.standard.credits} variant="outlined" />
            </Stack>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="div">
              {item.file_Name}
            </Typography>
            <Typography color="text.secondary">
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
            sx={{ display: "flex", justifyContent: "space-between" }}
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
              <IconButton>
                <ThumbUpAltIcon />
              </IconButton>
              <Typography sx={{ mr: 2 }} color="text.secondary">
                {item.kudos}
              </Typography>
            </Stack>
          </CardActions>
        </Card>
      </Fade>
    </>
  );
}

export default NoteCard;
