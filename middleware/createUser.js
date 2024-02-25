const User = require('../Models/UserModel');

const createUser = async (req, res, next) => {
    try {
        const verifiedUser = req.User;
        const {email} = req.body;

        if(!verifiedUser?._id){

            const user = new User({
                email : email,
            });
            await user.save();
            req.User = user;
            next();
        }else if(verifiedUser?._id) {
            next();
        }
    } catch (error) {
        res.status(500).send({message:error.message}); 
    }
}


module.exports = createUser;