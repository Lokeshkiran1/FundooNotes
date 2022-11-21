const nodemailer=require('nodemailer')
const {google}=require('googleapis');

const CLIENT_ID='1015725421550-5e4vb5i5nf72tflhfr1cr99o3fgftpp0.apps.googleusercontent.com';
const  CLIENT_SECRET='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';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04MeZP6IRp4OTCgYIARAAGAQSNwF-L9IralkAohg2OQh8zMHzq4yBmqxBcY69QeGKtX5qc6a-AsgMu8-Cy5haacbuTcDl0V6fEPM';

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