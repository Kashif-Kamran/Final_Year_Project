import React from 'react'
// import useState and useEffec
import { Link } from 'react-router-dom'
import { Box,Typography,Button,Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ProjectCard from './ProjectCard'
import { colors } from "../../Theme"
// import useState
import { useState,useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../utils/SessionStorageService';

// Make styles
const useStyles = makeStyles((theme) =>
({
    addProjectButton: {
        padding: "10px 20px",
    },
    projectsInfo: {
        backgroundColor: colors.primary[400],
        padding: "20px",
        display: "flex",
        justifyContent: "space-around",
        margin: "20px 20px",
        borderRadius: "5px",
    },
    totalProjectInfo: {
        padding: "10px 20px",
    },
    projectList: {
        padding: "20px",
    }
}));


function ProjectsDetailComponent(props)
{
    const classes = useStyles();
    const [projectsList,setProjectList] = useState()
    const [projectsCount,setProjectsCount] = useState(0)
    const loadData = () =>
    {
        axios.get("http://localhost:4000/project/team-lead-projects",{
            headers: { authorization: `${getToken()}` }
        }
        ).then((res) =>
        {
            let projects = res.data.data;
            setProjectList(projects)
            setProjectsCount(projects.length)
        });
    }

    useEffect(() =>
    {

        loadData();
    },[]);
    return (
        <Box>
            <Box className={classes.projectsInfo}>
                <Typography className={classes.totalProjectInfo} variant='h5'>Total Projects: {projectsCount} </Typography>
            </Box>
            <Box className={classes.projectList}>
                <Grid container spacing={2}>
                    {
                        projectsList && projectsList.map((project) =>
                        {
                            return (
                                <Grid item xs={12} md={6} lg={4}>
                                    <ProjectCard key={project._id} projectName={project.projectName} projectPakageName={project.projectPakageName} startDate={project.projectStartDate} projectId={project._id} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default ProjectsDetailComponent