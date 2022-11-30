const nodemailer=require('nodemailer')
const {google}=require('googleapis');

const CLIENT_ID='664814502727-0ss2kt5tf3rfcgretivm9f5udhsk9j2v.apps.googleusercontent.com';
const  CLIENT_SECRET='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';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04Qtj4co_Hw60CgYIARAAGAQSNwF-L9IrOZeJ-4JtDTsoAaDdxJb1vygBiNmPnUQ4JamFLF57dkrY-ws-ivT1s5CEgwg26WN0i4k';

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

export async function sendMail(mailID){
    try{
        const accessToken=await oAuth2Client.getAccessToken();

        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'lokeshkskiran@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        });

        const mailOptions={
            from:'LokeshKS # <lokeshkskiran@gmail.com',
            to:mailID,
            subject:'Forgot Password API',
            text:'You can reset your password by clicking on the following link =============>>>>>>',
            
            html:`<h3>To reset your account with new password, please <a href="http://localhost:4000/api/v1/users/resetPassword">Click Here.....</a></h3>`
        };

        const result= await transport.sendMail(mailOptions);
        return result;

    }catch(error){
        return error;

    }
}
// sendMail()
// .then(result=> console.log('email sent ......',result))
// .catch((error)=>console.log(error.message));

//send mail for all the new registered users

export async function sendMailToNewUser(mailID,FirstName,LastName){
    try{
        //console.log(`${mailID} ${FirstName} ${LastName}`);
        const accessToken=await oAuth2Client.getAccessToken();

        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'lokeshkskiran@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        });

        const mailOptions={
            from:'LokeshKS # <lokeshkskiran@gmail.com',
            to:mailID,
            subject:'Registration is Successfull',
            text:`Hi, ${FirstName} ${LastName} the Registration for fundoo notes is successfull, you can login now !!!!!!!!!!`,
            
            html:`<h3>To login to fundoo notes, please <a href="http://localhost:4000/api/v1/users/login">Click Here.....</a></h3>`
        };

        const result= await transport.sendMail(mailOptions)
        console.log("===============>>>>",result);
        return result;

    }catch(error){
        return error;

    }
}