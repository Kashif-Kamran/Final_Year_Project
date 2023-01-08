import React from 'react'
//import Box, typography and makestyles
import { Box,Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
// import colors
import { colors } from "../Theme"
// import default theme


// Make styles
const useStyles = makeStyles((theme) =>
({

}));
function GreetingSection()
{
    const classes = useStyles();
    return (
        <Box>
            <Typography variant="h4" color="white">
                DASHBOARD
            </Typography>
            <Typography variant="h6" color={colors.greenAccent[400]} sx={{ my: "10px" }}>
                Welcome to your dashboard
            </Typography>
        </Box>
    )
}

export default GreetingSection