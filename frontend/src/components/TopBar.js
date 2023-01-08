import React from 'react'
import { IconButton } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Box,Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { colors } from "../Theme"
import { useLocation } from 'react-router-dom';
// Make styles
const useStyles = makeStyles((theme) =>
({
    topBar: {

        display: "flex",
        justifyContent: "space-between",
        // backgroundColor: colors.primary[400],
        padding: "0.7% 1.5% "
    },
    searchBox: {
        display: "flex",
        backgroundColor: colors.primary[600],
        borderRadius: "3px"
    }
}));


function TopbarFragment()
{
    const classes = useStyles();
    return (
        <Box className={classes.topBar}>
            <Box className={classes.searchBox}>
                <InputBase sx={{ ml: 3,flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box>
                <Typography variant='h4'>DASHBOARD</Typography>
            </Box>
            <Box display="flex">
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

function TopBar()
{

    const location = useLocation();
    // palce condition when page is login or register
    if (location.pathname !== '/login' && location.pathname !== '/register')
    {
        return (
            <TopbarFragment />
        );
    }
    else
    {
        return null;
    }
}


export default TopBar;