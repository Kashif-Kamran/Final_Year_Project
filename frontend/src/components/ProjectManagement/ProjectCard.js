import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box,CardActionArea,Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { colors } from "../../Theme"
import { useNavigate } from 'react-router-dom'
// Make styles
const useStyles = makeStyles((theme) =>
({
    cardBox: {
        backgroundColor: colors.primary[400],
        padding: "20px 20px",
        borderRadius: "5px"
    },
    btnBox: {
        display: "flex",
        justifyContent: "flex-end",
    },
    data: {
        padding: "10px 20px",
        borderRadius: "10px"
    }
}));


function ProjectCard(props)
{
    const navigate = useNavigate();

    const handleCardClick = () =>
    {
        console.log("Card Clicked");
        console.log("Project Id : ",props);
        navigate("/project-profile",{ state: { projectId: props.projectId } });

    }
    const classes = useStyles();
    return (
        <Box className={classes.cardBox}>
            <CardActionArea sx={{ borderRadius: "5px" }} onClick={handleCardClick}>
                <Box className={classes.data}>
                    <Typography varient="h4" fontSize="1.5rem" textAlign="center">{props.projectName}</Typography>
                    <hr />
                    <Typography varient="h6" component="div" md={{ mx: "30px" }}>Type: {props.projectPakageName}</Typography>
                    <Typography varient="h6" component="div" md={{ mx: "30px" }}>Start Date : {props.startDate}</Typography>
                </Box>
            </CardActionArea>
        </Box>
    );
}


export default ProjectCard;