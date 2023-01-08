// Import Team Lead Model 
const TeamLead = require('../models/TeamLead');
// import jsonwebtoken
const jwt = require('jsonwebtoken');

// Create Team Lead Service
class TeamLeadService
{
    // Create Constructor with 
    constructor()
    {
        this.teamLead = TeamLead;
    }
    // Create New TeamLead  
    async addNewTeamLead(newTeamLead)
    {
        // Find if user is present with the username
        console.log("New Team Lead : ",newTeamLead);
        let user = await this.teamLead.findOne({ username: newTeamLead.username })
        console.log(user);
        // If user is present then return false
        if (user)
            return {
                status: false,
                error: {
                    message: "Username Already Exists"
                }
            };
        // Check if Email is Already taken or not
        let emailuser = await this.teamLead.findOne({ email: newTeamLead.email })
        console.log("Check Email : ",emailuser);
        if (emailuser)
            return {
                status: false,
                error: {
                    message: "Email Already Exists"
                }
            };

        // If user is not present then create new user

        try
        {
            let teamLead = new this.teamLead(newTeamLead);
            let result = await teamLead.save();
            return {
                status: true,
                data: result
            };
        }
        catch (error)
        {
            console.log("Error in Saving Team Lead",error.message);
            return {
                status: false,
                error: {
                    message: `Database Error : ${error.message}`
                }
            };
        }
    }
    async login(data)
    {
        // Check if user is present
        let user = await this.teamLead.findOne({ username: data.username });
        if (!user)
            return {
                status: false,
                error: {
                    message: "User Not Found"
                }
            };
        // Check if password is correct
        if (data.password !== user.password)
        {
            console.log("Password is Incorrect")
            return {
                status: false,
                error: {
                    message: "Password is Incorrect"
                }
            };
        }
        // Create Token
        console.log("User Ready to be loged in : ",user);
        // Generate Token
        let token = jwt.sign({ id: user._id },"kashifkarman");
        console.log("Token : ",token);
        return {
            status: true,
            data: {
                token: token
            }
        }
    }
    // Authenticate new User
    async authenticateUser(token)
    {
        try
        {
            let verified = jwt.verify(token,"kashifkarman");
            console.log("Verified : ",verified);
            let user = await this.teamLead.findOne({ _id: verified.id });
            console.log("User : ",user);
            if (!user)

                return {
                    status: false,
                    error: {
                        message: "User Not Found"
                    }
                };
            return {
                status: true,
                data: user
            };
        } catch (error)
        {
            return {
                status: false,
                error: {
                    message: "Invalid Token"
                }
            };
        }
    }
    // Get Team Lead By Id
    async getTeamLeadById(id)
    {
        try
        {
            let teamLead = await this.teamLead.findOne({ _id: id });
            if (!teamLead)
                return {
                    status: false,
                    error: {
                        message: "Team Lead Not Found"
                    }
                };
            return {
                status: true,
                data: teamLead
            };
        } catch (error) 
        {
            return {
                status: false,
                error: {
                    message: "Database Error"
                }
            };

        }
    }
}


module.exports = TeamLeadService;