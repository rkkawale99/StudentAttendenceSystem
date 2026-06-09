
const jwt = require("jsonwebtoken")
const JWT_SECREAT = "Rushiadfakldkf"

const fetchUser =  (req, res, next)=>{
    let token = req.header('auth-token');
if(!token){
        return res.status(401).json({error : " Please add valid token"})
    }
    try {
        let user =  jwt.verify(token, JWT_SECREAT);
        req.user = user.user;
        next();
    } catch (error) {
        return res.status(401).json({error : " Please add valid token"})
    }
}

module.exports = fetchUser;