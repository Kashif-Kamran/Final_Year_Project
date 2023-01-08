import React from 'react'
import { Box,Typography,Grid,MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { colors } from "../Theme"
import { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { getToken } from '../utils/SessionStorageService';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const useStyles = makeStyles((theme) =>
({
    sidebar: {
        backgroundColor: colors.primary[400],
        padding: "20px",
        position: "static"
    }
    ,
    userInfo: {
        padding: '10px',
        borderRadius: "5px",
        backgroundColor: colors.primary[600],

        // img
        "& img": {
            width: "100px",
            height: "100px",
            borderRadius: "100%",
            margin: "0px auto"
        },
        // select typography
        "& h4": {
            margin: "10px 2px 5px 2px",
        },
        "& h5": {
            textAlign: "center",
            margin: "5px 2px 10px 2px",
        },
    },
    actionBox: {
        padding: "30px 20px ",
        borderRadius: "5px",
        marginTop: "20px",
        backgroundColor: colors.primary[600],
        width: "100%",
    }
}));


function SideBarFragment()
{

    const navigate = useNavigate();
    const classes = useStyles();
    const [teamLeadInfo,setTeamLeadInfo] = useState({
        fullName: "Default",
        username: "Default",
        email: "Default@gmail.com",
    });


    async function loadTeamLeadInfo()
    {
        try
        {
            let apiResponse = await axios.get("http://localhost:4000/teamlead/teamleadinfo",{
                headers: { authorization: `${getToken()}` }
            });

            setTeamLeadInfo(apiResponse.data);
        } catch (error)
        {
            console.log("Error Occured while Loading Data",error.response);
            if (error.response.status === 401)
            {
                navigate("/login")
            }

        }
    }
    useEffect(() =>
    {
        loadTeamLeadInfo();
    },[])

    return (
        <Box className={classes.sidebar} >
            <Box className={classes.userInfo}>
                <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" />
                <Typography className={classes.userName} variant="h4" align="center" >{teamLeadInfo.fullName}</Typography>
                <Typography variant="h5" textAlign="center" color={colors.greenAccent[500]}>{teamLeadInfo.username}</Typography>
                <Typography variant="h6" textAlign="center" m={"20px 0px 10px "} color={colors.greenAccent[500]}>{teamLeadInfo.email}</Typography>
            </Box>
            <Box className={classes.actionBox}>
                <Typography variant="h4" textAlign="center" color={colors.greenAccent[500]}>Actions</Typography>
                <MenuItem classes={classes.actionItem} onClick={() => navigate("/")} >Home</MenuItem>
                <MenuItem onClick={() => navigate("/create-new-project")} >Create New Project</MenuItem>
            </Box>
        </Box>
    )
}



export function Sidebar()
{
    const location = useLocation();
    // palce condition when page is login or register
    if (location.pathname !== '/login' && location.pathname !== '/register')
    {
        return (
            <Grid item xs={12} sm={4.5} md={3.5} lg={2.5}>
                <SideBarFragment />
            </Grid>
        );
    }
    else
    {
        return null;
    }
}
export default Sidebar;