// Import Mongoose and Create Team Lead Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teamLeadSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export Team Lead Model
const TeamLead = mongoose.model('TeamLead',teamLeadSchema);
module.exports = TeamLead;
