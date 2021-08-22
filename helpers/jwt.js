// const expressJWT = require('express-jwt')

//     function authJwt(){
            
//             return expressJWT({
//                 secret: 'secret',
//                 algorithms: ['HS256']
//             })
//     }
// module.exports = authJwt;


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[0];
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
}