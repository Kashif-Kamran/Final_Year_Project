const jwt = require("jsonwebtoken")

// Authorization of Routes
module.exports = async function (req,res,next)
{

    let token = req.headers.authorization;
    if (!token)
    {
        return res.status(401).send(
            {
                status: false,
                error: {
                    message: "Access Denied"
                }
            }
        );
    }
    try
    {
        let verified = jwt.verify(token,"kashifkarman");
        req.userInfo = verified;
        next();
    } catch (error)
    {
        return res.status(401).send(
            {
                status: false,
                error: {
                    message: "Invalid Token"
                }
            }
        );
    }
}