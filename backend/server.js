const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Import Router
const teamLeadRouter = require("./src/routers/TeamLead.route");
const projectRouter = require("./src/routers/Project.route");
const port = 4000 || process.env.PORT; // Application Port
// Confirg

// Database Connection 
mongoose.connect("mongodb://localhost:27017/FypDatabase",{ useNewUrlParser: true,useUnifiedTopology: true })
    .then((connect) => console.log(`Database Connected Successfully (FypDatabase)`))
    .catch((error) => console.log(`Error occured while database connection ${error} `))


// Application Configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Create Routes
app.use("/teamlead",teamLeadRouter);
app.use("/project",projectRouter);



// Start Server
app.listen(port,() =>
{
    console.log(`Server is running on port ${port}`);
}
);
