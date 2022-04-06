const jwt = require("jsonwebtoken");

function authenticateToken(req,res,next) {

    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401) 
        
    jwt.verify(token,"Snippet_SceretKEY",(err,user)=>{
        if (err) return res.sendStatus(401);
         req.user = user;
         next();
            
        
    });
    
}

function generateAccessToken(username) {
    return jwt.sign({data:username},"snippet_SceretKEY",{
        expiresIn:"1h"
    });
    
}


module.exports = {
    authenticateToken,
    generateAccessToken
};