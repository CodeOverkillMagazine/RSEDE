const sendNotification = (urlValue)=>{
    var fs = require('fs');

    var distributionObj = JSON.parse(fs.readFileSync("./distribution-list.json"));
    var distibutionList = distributionObj.members;
    var nodemailer = require('./node_modules/nodemailer');
    var ejs = require('./node_modules/ejs');

    let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
            user: 'apikey',
            pass: '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'
        } 
    });

    let replacement = {url: urlValue};

    var templateData;
   
    templateData = fs.readFileSync("./email-template.txt").toString();

    let htmlData = ejs.render(templateData , replacement);
    var interval =  500;
    for (var index = 0, len = distibutionList.length; index < len; index++) {
        setTimeout( function (index,distibutionList) {
            let mailOptions = {
                from: 'fdavis@ghostdevelopment.com',
                to: distibutionList[index].email,
                subject: 'Generating and sending the email using command line interface',
                html: htmlData,
            };
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err)
                    return console.log(err)
                console.log('message sent: %s',info.messageId)
            });
           
        },interval*index ,index,distibutionList); 
    }
}

module.exports = { sendNotification };
