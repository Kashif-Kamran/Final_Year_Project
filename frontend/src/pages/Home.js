
import { Box } from '@mui/material'
import ProjectDetials from '../components/ProjectManagement/ProjectDetails';
import { makeStyles } from '@mui/styles'
// Make styles

const useStyles = makeStyles((theme) =>
({
    Section: {
        margin: `${theme.spacing(1)} ${theme.spacing(3)}`,
        padding: theme.spacing(1),
        borderRadius: "5px",
    }
}));


export const Home = () =>
{

    const classes = useStyles();
    return (
        <Box>
            <ProjectDetials />
        </Box>
    );
}
