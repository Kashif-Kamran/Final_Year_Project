import { Route,Routes } from "react-router-dom";
import Register from './pages/Register';
import { Home } from './pages/Home';
import Login from './pages/Login';
import CreateNewProject from "./components/ProjectManagement/CreateNewProject";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import { Grid,Box } from "@mui/material";
import ProjectProfile from "./pages/ProjectProfile";
// import makestyles
import { makeStyles } from "@mui/styles";
import { colors } from "./Theme";

// makestyles
const useStyles = makeStyles((theme) =>
({
  pageSection: {
    padding: "10px 20px"
  }
}));
function App()
{
  const classes = useStyles();
  return (

    <div className="App" >

      <TopBar />
      <Grid container >
        <Sidebar />
        <Grid container className={classes.pageSection} item xs={12} sm={7.5} md={8.5} lg={9.5} direction="column">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-new-project" element={<CreateNewProject />} />
            <Route path="/project-profile" element={<ProjectProfile />} />
          </Routes>
        </Grid>
      </Grid>
    </div >

  );
}

export default App;
