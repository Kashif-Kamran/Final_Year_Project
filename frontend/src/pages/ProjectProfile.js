import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { Box,Typography,Button,Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { makeStyles } from '@mui/styles'
import { colors } from "../Theme"
import PerformMetrics from '../components/ProjectManagement/PerformMetrics'
import axios from "axios"
import { getToken } from "../utils/SessionStorageService"
import { useEffect,useState } from 'react'
// import joi
import Joi from 'joi'
import EditProjectDialog from '../components/ProjectManagement/EditProjectDialog'
// Make styles
const useStyles = makeStyles((theme) =>
({
    projectDetailPage: {
        backgroundColor: colors.primary[400],
        padding: "20px"
    }
}));
// Create Validation Function for Update Project 
const validateUpdateProject = (updateProInfo) =>
{
    const schema = Joi.object({
        projectName: Joi.string().min(3).max(30).required(),
        projectPakageName: Joi.string().min(3).max(30).required(),
        projectDescription: Joi.string().min(3).max(1024).required(),
    });
    return schema.validate(updateProInfo);
}
function ProjectProfile()
{

    const [updateProInfo,setUpdateProInfo] = useState({
        projectName: "",
        projectPakageName: " ",
        projectDescription: " ",
    });
    const handleUpdateProject = (event) =>
    {
        let name = event.target.name;
        let value = event.target.value;
        setUpdateProInfo((prev) =>
        {
            return {
                ...prev,
                [name]: value
            }
        }
        );
    }
    const handleUpdateProjectSubmit = () =>
    {

        let dataToSend = updateProInfo;
        // 
        delete dataToSend._id;
        delete dataToSend.projectStartDate;
        delete dataToSend.teamLeadId;
        delete dataToSend.__v;
        // 
        const projectId = location.state.projectId;
        const { error } = validateUpdateProject(dataToSend);
        if (error)
        {
            console.log("Error In: ",error.message);
            alert("Error : " + error.message)
            return;
        }

        axios.put(`http://localhost:4000/project/update-project/${projectId}`,dataToSend,{
            headers: { authorization: `${getToken()}` }
        }).then((resp) =>
        {
            console.log("Project Updated Successfully : ",resp.data.data.projectInfo);
            setOpenProjectEditDialog(false);
            loadProjectData()
        }).catch((err) =>
        {
            console.log("Unable to Update Project : ",err);
            alert("Error Occured While Project Update")
        });
    }
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const [proInfo,setProInfo] = useState({
        projectName: "",
        projectPakageName: " ",
        projectDescription: " ",
        projectStartDate: " ",
    });

    const [openProjectEditDialog,setOpenProjectEditDialog] = useState(false);
    const handleEditProject = () =>
    {

        setOpenProjectEditDialog(true);
    }
    const loadProjectData = () =>
    {
        console.log("location.state.projectId",location.state.projectId)
        axios.get(`http://localhost:4000/project/project-details/${location.state.projectId}`,{
            headers: { authorization: `${getToken()}` }
        }
        ).then((resp) =>
        {
            console.log("Getting Project Data : ",resp.data.data.projectInfo);
            setProInfo(resp.data.data.projectInfo);
            setUpdateProInfo(resp.data.data.projectInfo)
        }).catch((err) =>
        {
            console.log("Unable to Project Data : ")
            console.log("Error : ",err);
        });
    }
    useEffect(() =>
    {
        loadProjectData();
    },[]);
    const handleDeleteButton = () =>
    {
        const projectId = location.state.projectId;
        try 
        {
            axios.delete(`http://localhost:4000/project/delete-project/${projectId}`,{
                headers: { authorization: `${getToken()}` }
            }).then((resp) =>
            {
                console.log("Project Deleted Successfully : ",resp.data.data);

                navigate("/")
            }).catch((err) =>
            {
                console.log("Unable to Delete Project : ",err);
            });
        } catch (error)
        {
            console.log("Error Occured While Deleting Project : ",error)
        }
    }
    return (
        <Box className={classes.projectDetailPage}>
            <Typography textAlign="center" variant='h2'> Project Profile Page </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>

                    <Box>

                        <Box sx={{
                            margin: "10px 0px",
                            padding: "20px 10px"
                        }}>
                            <Typography variant="h4" my="10px"> Project Name :  {proInfo.projectName}</Typography>
                            <Typography variant="h5" my="5px"> Project Package Name : {proInfo.projectPakageName}</Typography>
                            <Typography variant="h5" my="5px"> Project Description : {proInfo.projectDescription}</Typography>
                            <Typography variant="h5" my="5px"> Project Start Date : {proInfo.projectStartDate}</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "20px"
                        }}>
                            <Button variant='contained' startIcon={<EditOutlinedIcon />} onClick={handleEditProject}>
                                Edit
                            </Button>
                            <Button variant='contained' startIcon={<DeleteIcon />} onClick={handleDeleteButton}>
                                Delete
                            </Button>
                        </Box>
                        <EditProjectDialog openDialogState={openProjectEditDialog} setOpenDialogState={setOpenProjectEditDialog} projectInfo={updateProInfo} handleTextInput={handleUpdateProject} handleUpdateBtn={handleUpdateProjectSubmit} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            margin: "10px 10px",
                            padding: "20px 10px"
                        }}
                    >
                        < PerformMetrics projectId={location.state.projectId} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProjectProfile;