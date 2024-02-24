const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

const User = require('../Models/UserModel');
const OTP = require('../Models/OTPModel');
const handleMail = require('../helper/handleMail');

const sendotp = async (req, res) => {
    try{
        const user = req?.User;
        const gen_OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
        const email_message = `Hi! Your music PIN is ${gen_OTP} . Keep grooving with Wynk :)`;
        const ans = await handleMail({email:user?.email,email_message:email_message});
        if(ans){
            await OTP?.updateOne({userId:user?._id},{otp:gen_OTP},{upsert:true});
            return res.status(200).send({message:'OTP sent successfully'});
        }
       
    }catch(error){
        res.status(500).send({message:error.message});
    }
};

const sendLink = async (req, res) => {
    try{
        const user = req?.User;
        const email_message = `Hey! Here's your link to download Wynk Music App. Tap: https://open.wynk.in/wynkapp . Enjoy Song Downloads, HelloTunes, Podcasts, LIVE Concerts & more!`;
        const ans = await handleMail({email:user?.email,email_message:email_message});
        if(ans){
            return res.status(200).send({message:'OTP sent successfully'});
        }
       
    }catch(error){
        res.status(500).send({message:error.message});
    }
};

const login = async (req, res) => {

    try{

        const {OTP:incommingOTP} = req.body;

        const user = req?.User;

        if(!user?._id) return res.status(400).send({message:'User not found'});

        const userOTP = await OTP.findOne({userId:user?._id});

        if(!userOTP?.otp) return res.status(400).send({message:'OTP Expired. Please request for a new OTP'});

        if(userOTP.otp !== incommingOTP) return res.status(400).send({message:'Incorrect OTP entered. Please enter the correct OTP'});

        const token = jwt.sign({
            userId: user?._id
        },process.env.SECRET_KEY, { expiresIn: '24h' });

        if(token){

            await OTP.deleteOne({userId:user?._id});
            await User.updateOne({_id:user?._id},{authToken:token});
            return res.status(200).send({token:token,email:user?.email,message:'Login Successful'});

        }
        
    }catch(error){
        res.status(500).send({message:error.message});
    }
};

module.exports = {sendotp,login,sendLink};