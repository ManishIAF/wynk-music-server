const nodeMailer = require('nodemailer');
const Mailgen = require('mailgen');

const handleMail = async ({email:userMail,email_message}) =>{

   try {

    const config = {
        // service : 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth : {
            user : process.env.E_mail,
            pass : process.env.PASSWORD
        }
    }

    let transporter = nodeMailer.createTransport(config)

    let Mailgenerator = new Mailgen({
        theme : 'default',
        product : {
            name : 'Manish shaw',  
            link : 'https://google.com/'
        }
    })

    let response = {
        body : {
            name :'Wynk Music', // user name
            intro : 'Welcome to Wynk Music App',
            // table : {
            //     data : [
            //         {
            //             item : "Nodemailer stack book" ,
            //             description : " A Backend application",
            //             price : '4546 RS'
            //         }
            //     ]
            // },
            // outro : 'DO not shere thih OTP with any one'
        }
    }
    
    // let emailBody = Mailgenerator.generate(`Hi! Your music PIN is ${Pin} . Keep grooving with Wynk :)`);
    // Generate the email body using Mailgen
    let emailBody = Mailgenerator.generate(response);
    let message = {
        from : process.env.E_mail,  
        to : userMail,
        subject : "Welcome to Wynk Music",
        html : email_message,
    }

    const resp = transporter.sendMail(message)
    
    if (!resp) {
        console.log(error.message);
        return false
    } 
    if(resp) {
        console.log('Email sent: ' + resp.response);
        return true;
    }


   } catch (error) {
    console.log('error : ',error?.message);
        return false;

        // return Promise.reject({error})
  
    }
}

module.exports = handleMail;