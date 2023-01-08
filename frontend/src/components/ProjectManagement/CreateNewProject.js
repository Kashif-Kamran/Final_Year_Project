import React,{ useRef } from 'react'
import { useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box,Typography,TextField,Button,Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { colors } from "../../Theme"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { getToken } from '../../utils/SessionStorageService';
import { readRemoteFile } from 'react-papaparse'
import Joi from 'joi';

var fileDataInObjects = {};// List to Store file Data

var checkFileLoad = false;
// Make styles  boilder plate
const useStyles = makeStyles((theme) =>
({
    createNewProject: {
        backgroundColor: colors.primary[400],
        padding: "20px 30px",
        borderRadius: "5px"
    },
    btnBox: {
        display: "flex",
        justifyContent: "space-around",
    },
    targetBoxes: {
        backgroundColor: colors.primary[400],
        padding: "20px 30px",
        borderRadius: "5px",
        margin: "10px 0px",

    }
}));
// Validate Project Data 
let validateProjectData = (data) =>
{
    const schema = Joi.object({
        projectName: Joi.string().required().min(3).max(30).required(),
        projectPakageName: Joi.string().lowercase().trim().replace(/\s+/g,'').required(),
        projectDescription: Joi.string().required().min(3).max(1024).required(),
    });
    return schema.validate(data);
}
let validateTargetData = (data) =>
{
    const schema = Joi.object({
        installData: Joi.number().precision(10).required(),
        Dau: Joi.number().precision(10).required(),
        insByDau: Joi.number().precision(10).required(),
        playTime: Joi.number().precision(10).required(),
        D1: Joi.number().precision(10).required(),
        Anr: Joi.number().precision(10).required(),
        crashes: Joi.number().precision(10).required(),
        impByDau: Joi.number().precision(10).required(),
    });
    return schema.validate(data);
}
// Process CSV

function CreateNewProject()
{
    const classes = useStyles();// Make styles
    const navigate = useNavigate();// Navigate
    var target = useState({
        installData: "",
        Dau: "",
        insByDau: "",
        playTime: "",
        D1: "",
        Anr: "",
        crashes: "",
        impByDau: "",
    });

    const [loadedFileName,setFileName] = useState("No File Selected"); // File Name
    const [formData,setFormData] = useState({
        projectName: "",
        projectPakageName: "",
        projectDescription: "",
    });
    //      Button Action Handlers
    // Function To Handle Form Data Change
    function handleChange(e)
    {
        const { name,value } = e.target;
        setFormData(prevData =>
        {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    // Handle Targets Input Change
    function handleTargetChange(e)
    {
        const { name,value } = e.target;
        target[1](prevData =>
        {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    // handle File input function
    async function handleFileInput(event)
    {
        event.preventDefault();
        let file = event.target.files[0];
        console.log("File Name : ",file.name)
        setFileName(file.name);
        readRemoteFile(file,{
            worker: true,
            complete: (results) =>
            {
                return preprocessCSVData(results.data);
            }

        });

    }
    // Function To Handle Submit Button
    async function handleSubmit(e)
    {
        // Validate File Data

        if (!checkFileLoad)
        {
            console.log("Wait for Loading File");
            return;
        }


        // Validate Form Data
        const { error } = validateProjectData(formData);
        if (error)
        {
            console.log(error.message);
            alert(error.message);
            return;
        }
        // Validate Target Data
        const { error: targetError } = validateTargetData(target[0]);
        if (targetError)
        {
            console.log(targetError.message);
            alert(targetError.message);
            return;
        }

        let tars = target[0];
        Object.keys(tars).forEach((val) =>
        {
            fileDataInObjects[val].target = tars[val];
        })
        // create data chunk
        let dataToSend = {
            formData,
            fileDataInObjects,
        }
        console.log("Data to send : ",dataToSend)


        // Send Data to Server
        let token = getToken();
        try
        {
            let response = await axios.post("http://localhost:4000/project/create-new",dataToSend,{
                headers: { authorization: `${getToken()}` }
            });
            console.log("Create Project Response : ",response);

            // Navigate to Project Page
            alert("Project Added Successfully")
            navigate("/")
        } catch (error)
        {
            console.error("Error Occured Creating Project")
            alert("Error Occured Creating Project")
        }

    }

    // Preprocess CSV Data
    function preprocessCSVData(data)
    {
        var installData = {
            metricsName: "installs",
            metricsData: []
        }
        var Dau = {
            metricsName: "DAU",
            metricsData: []
        }
        var insByDau = {
            metricsName: "installs / DAU",
            metricsData: []
        }
        var playTime = {
            metricsName: "PT",
            metricsData: []
        }
        var D1 = {
            metricsName: "D1",
            metricsData: []
        }
        var Anr = {
            metricsName: "ANR",
            metricsData: []
        }
        var crashes = {
            metricsName: "Crashes",
            metricsData: []
        }
        var impByDau = {
            metricsName: "IMP / DAU",
            metricsData: []
        }

        data.forEach((row,index) =>
        {

            if (index !== 0)
            {
                installData.metricsData.push({
                    date: row[0],
                    value: row[1]
                });
                Dau.metricsData.push({
                    date: row[0],
                    value: row[2]
                });
                insByDau.metricsData.push({
                    date: row[0],
                    value: row[3]
                });
                playTime.metricsData.push({
                    date: row[0],
                    value: row[4]
                });
                D1.metricsData.push({
                    date: row[0],
                    value: row[5]
                });
                Anr.metricsData.push({
                    date: row[0],
                    value: row[6]
                });
                crashes.metricsData.push({
                    date: row[0],
                    value: row[7]
                });
                impByDau.metricsData.push({
                    date: row[0],
                    value: row[8]
                });
            }
        });
        fileDataInObjects.installData = installData;
        fileDataInObjects.Dau = Dau;
        fileDataInObjects.insByDau = insByDau;
        fileDataInObjects.playTime = playTime;
        fileDataInObjects.D1 = D1;
        fileDataInObjects.Anr = Anr;
        fileDataInObjects.crashes = crashes;
        fileDataInObjects.impByDau = impByDau;
        checkFileLoad = true;
    }

    return (
        <Box className={classes.createNewProject}>
            <Typography variant="h4" color="white" textAlign="center" margin="10px">Create New Project</Typography>
            <Grid container spacing={0.5}>
                <Grid Item md={7} >
                    <TextField
                        value={formData.projectName}
                        onChange={handleChange}

                        fullWidth
                        margin="dense"
                        name='projectName'
                        label="Project Name"
                        variant="filled"
                        required
                    />

                    <TextField
                        value={formData.projectPakageName}
                        onChange={handleChange}

                        fullWidth margin="dense"
                        name='projectPakageName'
                        label="Pakage Name"
                        variant="filled"
                        required
                    />

                    <TextareaAutosize
                        value={formData.projectDescription}
                        onChange={handleChange}

                        aria-label="minimum height"
                        minRows={3}
                        name="projectDescription"
                        placeholder="Project Description"
                        style={{ width: '100%',backgroundColor: `#3c4659`,padding: "20px 20px 10px 20px",margin: "10px 0px",borderRadius: "5px" }}
                    />

                </Grid>
                <Grid Item md={5} sm={12} sx={{
                    padding: "20px 30px",
                }}>

                    <Typography variant='h4' textAlign="center">Upload csv File</Typography>
                    <Typography varient="h6" textAlign="center"
                        sx={{
                            backgroundColor: colors.primary[500],
                            letterSpacing: "2px",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            margin: "30px 0px 10px 0px",
                        }}
                    >
                        {loadedFileName}
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >

                        <input
                            accept=".csv"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleFileInput}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" sx={{
                                textAlign: "center",
                                padding: "10px 30px",

                            }} component="span" className={classes.button} startIcon={<UploadFileIcon />}>
                                Upload File
                            </Button>
                        </label>


                    </Box>
                </Grid>
            </Grid>

            {/*Box For Setting Targets */}
            <Box sx={{
                backgroundColor: colors.primary[500],
                padding: "20px 30px",
                borderRadius: "5px",
                margin: "30px 0px",
            }}>
                <Typography variant="h4" textAlign="center">Set Targets</Typography>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">Install</Typography>
                            <hr />
                            <TextField
                                value={target.installData}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='installData'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">DAU</Typography>
                            <hr />
                            <TextField
                                value={target.Dau}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='Dau'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">Installs / DAU</Typography>
                            <hr />
                            <TextField
                                value={target.insByDau}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='insByDau'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">Play Time</Typography>
                            <hr />
                            <TextField
                                value={target.playTime}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='playTime'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">Retesion D1</Typography>
                            <hr />
                            <TextField
                                value={target.D1}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='D1'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">ANR</Typography>
                            <hr />
                            <TextField
                                value={target.Anr}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='Anr'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">Crashes</Typography>
                            <hr />
                            <TextField
                                value={target.crashes}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='crashes'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={12} lg={3}>
                        <Box className={classes.targetBoxes}>
                            <Typography sx={{
                                marginBottom: "5px"
                            }} variant="h5" textAlign="center">IMP / DAU</Typography>
                            <hr />
                            <TextField
                                value={target.impByDau}
                                onChange={handleTargetChange}

                                fullWidth
                                margin="dense"
                                name='impByDau'
                                label="Target"
                                variant="filled"
                                required
                            />
                        </Box>
                    </Grid>
                </Grid>

            </Box>



            <Box className={classes.btnBox}>
                <Button sx={{ px: 10,py: 2 }} variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />}>
                    Save
                </Button>

            </Box>
        </Box >
    )
}

export default CreateNewProject
