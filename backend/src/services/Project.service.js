const Project = require('../models/Project');
// import PerformanceMetrices model
const PerformanceMetrices = require('../models/PerformanceMetrices');
class ProjectService
{
    // Get all projects
    constructor()
    {
        this.ProjectSchema = Project;
    }
    async createNewProject(newProjectData,userId)
    {
        try
        {
            let newProject = newProjectData.formData;
            let performanceMetrices = newProjectData.fileDataInObjects;
            let project = new this.ProjectSchema(newProject);
            project.teamLeadId = userId;
            let result = await project.save();


            Object.keys(performanceMetrices).forEach((key) =>
            {
                console.log("Key : ",key," :=>Saved"," : ",performanceMetrices[key].metricsData);
                let performanceMetricesData = new PerformanceMetrices({
                    projectId: result._id,
                    metricsName: key,
                    metricsTarget: performanceMetrices[key].target,
                    metricsData: performanceMetrices[key].metricsData
                });
                performanceMetricesData.save();

            })

            return {
                status: true,
                data: result
            };
        }
        catch (error)
        {
            console.log("Error in Saving Project (Project Service)",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            };
        }
    }
    async getProjectsByTeamLeadId(teamLeadId)
    {
        try
        {
            let projects = await this.ProjectSchema.find({
                teamLeadId: teamLeadId
            });
            return {
                status: true,
                data: projects
            };
        }
        catch (error)
        {
            console.log("Error in Getting Projects",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            };
        }

    }
    async getProjectDetailsById(projectId)
    {
        console.log("Parameter Reached To Project Service : ",projectId)
        try
        {
            let projectInfo = await this.ProjectSchema.findOne({ "_id": projectId });
            let performanceMetrices = await PerformanceMetrices.find({ "projectId": projectId });
            return {
                status: true,
                data: {
                    projectInfo: projectInfo,
                    performanceMetrices: performanceMetrices
                }
            };
        }
        catch (error)
        {
            console.log("Error in Getting Project Details",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            };
        }
    }
    async deleteProjectById(projectId)
    {
        // first delete all metrices and then delete project info
        try
        {
            // delete the metrices
            let result = await PerformanceMetrices.deleteMany({
                projectId: projectId
            });
            // delete the project
            let project = await this.ProjectSchema.deleteOne({
                _id: projectId
            });
            return {
                status: true,
                data: project
            };
        }
        catch (error)
        {
            console.log("Error in Deleting Project",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`


                }
            }
        }
    }
    async updateProjectById(projectId,projectData)
    {
        try
        {
            // get Object from mongodb
            let project = await this.ProjectSchema.findOneAndUpdate({ "_id": projectId },projectData)
            return {
                status: true,
                data: project
            };
        } catch (error)
        {
            console.log("Error in Updating Project",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            }
        }
    }
    // Get project Metrices Targets with name and id Info
    async getProjectMetricesTargets(projectId)
    {
        try
        {
            let projectMetrices = await PerformanceMetrices.find(
                { "projectId": projectId },
                { _id: 1,metricsName: 1,metricsTarget: 1 }
            );
            return {
                status: true,
                data: projectMetrices
            };
        }
        catch (error)
        {
            console.log("Error in Getting Project Metrices",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            }
        }

    }
    // Set target of Performance Matrices
    async setProjectMetricesTarget(matId,newTarget)
    {
        try
        {
            let performanceMetrices = await PerformanceMetrices.findOne({ "_id": matId });
            console.log("Performance Metrices : ",performanceMetrices);
            performanceMetrices.metricsTarget = newTarget;
            await performanceMetrices.save();
            return {
                status: true,
                data: performanceMetrices
            };
        }
        catch (error)
        {
            console.log("Error in Setting Project Metrices",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            }
        }
    }
}
// export Project service
module.exports = ProjectService;