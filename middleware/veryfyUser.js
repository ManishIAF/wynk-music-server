const User = require('../Models/UserModel');

const verifyUser = async (req, res, next) => {
    try {

        const userToVerify = req?.decodedData;
        const {email} = req.body;

        var query = {};

        if(userToVerify){
            query._id = userToVerify?.userId;
        }

        if(email){
            query.email = email;
        }

        const user = await User.findOne(query);

        if(!user){
            req.User = null;
            next();
        }
        if(user){
            req.User = user;
            next();
        }
        
    } catch (error) {
        res.status(500).send({message:error.message}); 
    }
}


module.exports = verifyUser;