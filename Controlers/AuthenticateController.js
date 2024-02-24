const Authenticate = async(req, res) => {
    try {

        const user = req?.User;
        const decodedData = req?.decodedData;

        if(user?.authToken === decodedData?.authToken){
            
            res.status(200).send({user:user?._id,email:user?.email})
        
        }

    } catch (error) {

        res.status(401).send({message:error.message});
    
    }

}

module.exports = Authenticate;