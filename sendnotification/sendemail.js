var program = require('./node_modules/commander');
const { sendNotification } = require('./emailfunction');

program.command('sendNotification <urlValue>').alias('send').action((urlValue)=>{
    sendNotification(urlValue);
})
program.parse(process.argv);
