import React from 'react'
import {Box, Container, Typography } from "@mui/material/";
import Drawer from "./Components/Drawer"

function Home(props) {
  return (
    <>
    <Container maxWidth="xl" sx={{ display: 'flex', mt: 3 }}>
        <Typography variant='h4'>Recently Created Notes</Typography>
    </Container>
    </>

  )
}

export default Home