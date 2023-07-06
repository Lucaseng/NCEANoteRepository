import React from "react";
import { Box, Container, Typography } from "@mui/material/";
import Drawer from "./Components/Drawer";
import NoteCard from "./Components/NoteCard";

function Home(props) {
  const itemList = [
    {
      note_ID: 4,
      file: "https://drive.google.com/file/d/14q5gt7WvP0aPLH7UzGPP9cxD0yOt7Agc/view?usp=sharing",
      file_Name: "Electrical Systems - Notes",
      kudos: 2,
      standard: {
        standard_ID: 91526,
        title: "Demonstrate understanding of electrical systems",
        credits: "6 credits",
        assessment: "External",
        level: "3",
        subject: { subject_ID: 54, subject_name: "Physics" },
      },
      user: {
        user_ID: 1,
        first_Name: "Lucas",
        last_Name: "Eng",
        email: "hi@lucaseng.dev",
        school: "Botany Downs Secondary College",
      },
    },
  ];
  const itemList2 = [
    {
      note_ID: 4,
      file: "https://drive.google.com/file/d/14q5gt7WvP0aPLH7UzGPP9cxD0yOt7Agc/view?usp=sharing",
      file_Name: "Electrical Systems - Notes",
      kudos: 2,
      standard: {
        standard_ID: 91526,
        title: "Demonstrate understanding of electrical systems",
        credits: "6 credits",
        assessment: "External",
        level: "3",
        subject: { subject_ID: 54, subject_name: "Physics" },
      },
      user: {
        user_ID: 1,
        first_Name: "Lucas",
        last_Name: "Eng",
        email: "hi@lucaseng.dev",
        school: "Botany Downs Secondary College",
      },
    },
    {
      note_ID: 5,
      file: "https://drive.google.com/file/d/1_2JTXZdnjNWi6CVeSZDzx-ZsaJstWaBT/view?usp=drive_link",
      file_Name: "Wave Systems - Notes",
      kudos: 1,
      standard: {
        standard_ID: 91523,
        title: "Demonstrate understanding of wave systems",
        credits: "4 credits",
        assessment: "External",
        level: "3",
        subject: { subject_ID: 54, subject_name: "Physics" },
      },
      user: {
        user_ID: 1,
        first_Name: "Lucas",
        last_Name: "Eng",
        email: "hi@lucaseng.dev",
        school: "Botany Downs Secondary College",
      },
    },
    {
      note_ID: 3,
      file: "https://docs.google.com/document/d/1AhWwLwfeGAzWDmd6QOcCjG7_1vnhDYfo/edit?usp=sharing&ouid=101904777528754850322&rtpof=true&sd=true",
      file_Name: "Bonding & Structure - Notes",
      kudos: 0,
      standard: {
        standard_ID: 91164,
        title:
          "Demonstrate understanding of bonding, structure, properties and energy changes",
        credits: "5 credits",
        assessment: "External",
        level: "2",
        subject: { subject_ID: 11, subject_name: "Chemistry" },
      },
      user: {
        user_ID: 1,
        first_Name: "Lucas",
        last_Name: "Eng",
        email: "hi@lucaseng.dev",
        school: "Botany Downs Secondary College",
      },
    },
    {
      note_ID: 2,
      file: "https://drive.google.com/file/d/1ev9Y0KYU8kf8uYZDem4_bz1m0LiOuM6F/view?usp=sharing",
      file_Name: "Physics 3.1 - Notes",
      kudos: 0,
      standard: {
        standard_ID: 91521,
        title:
          "Carry out a practical investigation to test a physics theory relating two variables in a non-linear relationship",
        credits: "4 credits",
        assessment: "Internal",
        level: "3",
        subject: { subject_ID: 54, subject_name: "Physics" },
      },
      user: {
        user_ID: 1,
        first_Name: "Lucas",
        last_Name: "Eng",
        email: "hi@lucaseng.dev",
        school: "Botany Downs Secondary College",
      },
    },
  ];
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ pb: 5 }}>
          Recently Created Notes
        </Typography>
        {itemList.map((i) => (
          <NoteCard key={i.note_ID} item={i} />
        ))}
      </Container>
    </>
  );
}

export default Home;
