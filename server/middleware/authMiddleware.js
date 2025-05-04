const jwt = require("jsonwebtoken");


const protect = async (req , res , next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized"})
        }

        const token = authHeader.split(" ")[1];

        if(!token) return res.status(401).json({message: "Unauthorized"})

        const payload = jwt.verify(token  , process.env.JWT_SECRET);

        req.user = payload;
        req.token = token;

        next()
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}
module.exports = protect;