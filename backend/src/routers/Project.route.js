const projectRouter = require('express').Router();
const ProjectService = require('../services/Project.service');
const projectService = new ProjectService();
const verifyToken = require('../verifyToken');
// Check Weather Server is running or not
projectRouter.get('/',(req,res) =>
{
    res.send({
        status: true,
        message: "Project Router is Working"
    });
});
// Create New Project
projectRouter.post('/create-new',verifyToken,async (req,res) =>
{
    console.log("Create New Project Route Hit ::=> \n",req.body);
    let result = await projectService.createNewProject(req.body,req.userInfo.id);
    res.status(200).send(result);
});
// Get Team Lead Projects


projectRouter.get('/team-lead-projects',verifyToken,async (req,res) =>
{
    console.log("Team Lead Projects Route Hit : ",req.userInfo.id);
    let result = await projectService.getProjectsByTeamLeadId(req.userInfo.id);
    res.send(result);
});

// Get Whole Project Details
projectRouter.get('/project-details/:id',verifyToken,async (req,res) =>
{
    console.log("Project Details Route Hit : ",req.params.id);
    let result = await projectService.getProjectDetailsById(req.params.id);
    res.send(result);
});
// Create a route to delete a project
projectRouter.delete('/delete-project/:id',verifyToken,async (req,res) =>
{
    console.log("Delete Project Route Hit : ",req.params.id);
    let result = await projectService.deleteProjectById(req.params.id);
    res.send(result);
});
// Create a route to update a project
projectRouter.put('/update-project/:id',verifyToken,async (req,res) =>
{
    console.log("Update Project Route Hit : ",req.params.id);
    let result = await projectService.updateProjectById(req.params.id,req.body);
    res.send(result);
});
// Create Route to get project Targets
projectRouter.get('/project-targets/:id',verifyToken,async (req,res) =>
{
    console.log("Project Targets Route Hit : ",req.params.id);
    let result = await projectService.getProjectMetricesTargets(req.params.id);
    res.send(result);
});
// Set Target of performance specfific 
projectRouter.post('/set-target/:id',verifyToken,async (req,res) =>
{
    console.log("Set Target Route Hit : ",req.params.id,req.body.newTarget);
    let result = await projectService.setProjectMetricesTarget(req.params.id,req.body.newTarget);
    res.send(result);
});
module.exports = projectRouter;