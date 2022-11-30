import { sendMailToNewUser } from './user.util';

var amqp = require('amqplib/callback_api');

export const sender=(queue,msg)=>{
    amqp.connect(`amqp://localhost`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 10000);
});
}


export const receiver=(queue)=>{
    amqp.connect(`amqp://localhost`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue,async function(msg){
            const objectJson=msg.content.toString().toString();
            const objectNormal=JSON.parse(objectJson);
            const EmailId=objectNormal.EmailID;
            const Firstname=objectNormal.FirstName;
            const Lastname=objectNormal.LastName;
            const result=await sendMailToNewUser(EmailId,Firstname,Lastname);
            console.log("result============>>>>>><<<<<<<",result);
        },
        {
            noAck: true
        });
    });
});
}
receiver('register');

