const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1] || req?.headers?.Authorization?.split(" ")[1];
// console.log('token',token);
        const decoded = jwt.verify(token,process.env.SECRET_KEY);

        req.decodedData = {userId:decoded?.userId,authToken:token};

        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).send({message:'not authorised'});
    }
}

module.exports = Auth;