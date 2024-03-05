const User = require("../src/models/users");

const userExistsMiddleware= async(req, res, next)=>{
try {
    const {email} = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        console.log("User already exists");
        return res.status(400).json({ msg: "User is already exist" });
    }else{
        next();
    }
} catch (error) {
    console.log("Error creating user", e);
    res.status(500).json({ error: "Internal Server Error" });
}

}

module.exports = userExistsMiddleware;