import React from 'react'
import { useRef } from 'react'
import { Typography } from '@mui/material'
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField } from '@mui/material'

function EditProjectDialog(props)
{

    function handleInput()
    {

    }
    return (
        <Dialog
            open={props.openDialogState}
        >
            <DialogTitle>
                <Typography variant='h3' textAlign="center" sx={{ margin: "10px 0px" }}> Edit Project </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    sx={{
                        margin: "10px 0px"
                    }}
                    value={props.projectInfo.projectName}
                    onChange={props.handleTextInput}
                    variant="outlined"
                    name='projectName'
                    placeholder='Project Name'
                    fullWidth />
                <TextField
                    sx={{
                        margin: "10px 0px"
                    }}
                    value={props.projectInfo.projectPakageName}
                    onChange={props.handleTextInput}
                    name='projectPakageName'
                    placeholder='Project Package Name'
                    variant="outlined"
                    fullWidth />
                <TextField
                    sx={{
                        margin: "10px 0px"
                    }}
                    value={props.projectInfo.projectDescription}
                    onChange={props.handleTextInput}
                    name='projectDescription'
                    variant="outlined"
                    placeholder='Project Description'
                    fullWidth />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={() =>
                {
                    props.setOpenDialogState(false)
                }}> Cancel </Button>
                <Button variant='contained' color='success' onClick={props.handleUpdateBtn}>
                    Update  </Button>
            </DialogActions>
        </Dialog >
    )
}

export default EditProjectDialog