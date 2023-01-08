// Import Mongoose and Create Project Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    teamLeadId: {
        type: Schema.Types.ObjectId,
        ref: 'TeamLead',
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    projectPakageName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectStartDate: {
        type: Date,
        default: Date.now
    }
});
// Export Project Model
const Project = mongoose.model('Project',projectSchema);
module.exports = Project;
