const User = require("../src/models/users");
const jwt = require('jsonwebtoken');
const userAuth = (req, res, next)=>{

    try {
        const authorizationHeader = req.headers.authorization;

        // Check if the authorization header is present
        if (!authorizationHeader) {
            return res.status(401).send("Authorization header is missing");
        }

        // Assuming the token is in the format "Bearer your_access_token_here"
        const token = authorizationHeader.split(" ")[1];

        // Verify the token using the provided signature
        const user = jwt.verify(token, process.env.SIGNETUREServer);

        // Attach the user object to the request for further use in the route
        req.user = user;

        next();

    } catch (error) {
        res.send("unauthorized").status(401);
    }

}

module.exports = userAuth;