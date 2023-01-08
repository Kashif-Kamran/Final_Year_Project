import React from 'react'
import { Box } from '@mui/material'
// import Table from material ui
import Table from '@mui/material/Table';
import { DataGrid,useGridApiRef } from '@mui/x-data-grid';
import axios from "axios"
import { useState,useEffect } from 'react'
import { getToken } from '../../utils/SessionStorageService';
const columns = [
    {
        field: 'id',
        headerName: 'No',
        width: 60
    },
    {
        field: 'metricsName',
        headerName: 'Performance Metrices',
        width: 150,
        editable: false,
    },
    {
        field: 'metricsTarget',
        headerName: 'Target',
        width: 70,
        editable: true,
    }
];


function PerformMetrics(props)
{
    const [rows,setRows] = useState([{ id: 1,kpiName: 'Snow',target: 'Jon',kpiId: "New" }])
    const apiRef = useGridApiRef();
    function loadKpiTargetData()
    {
        axios.get(`http://localhost:4000/project/project-targets/${props.projectId}`,{
            headers: { authorization: `${getToken()}` }
        }).then((response) =>
        {
            let kpiTargets = response.data.data;
            kpiTargets.forEach((element,index) =>
            {
                element.id = index
            })
            setRows(kpiTargets)
        }).catch((err) =>
        {
            console.log("Error : ",err)
        })
    }

    useEffect(() =>
    {
        loadKpiTargetData();
    },[])


    return (
        <Box sx={{ height: 300,width: '70%' }}>
            <DataGrid
                rows={rows}
                apiRef={apiRef}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={(newRow) =>
                {
                    const updatedRow = { ...newRow,isNew: false };
                    axios.post(`http://localhost:4000/project/set-target/${updatedRow._id}`,{ newTarget: updatedRow.metricsTarget },{
                        headers: { authorization: `${getToken()}` }
                    }).then((response) =>
                    {
                        console.log("Response After Editing Row: ",response)
                        if (response.data.status == false)
                        {
                            alert("Value Can Be Integer Only")
                        }
                        loadKpiTargetData();
                    }).catch(() =>
                    {
                        console.log("Error in Editing Row")
                    })
                    return updatedRow;
                }}
            />
        </Box>


    )
}

export default PerformMetrics