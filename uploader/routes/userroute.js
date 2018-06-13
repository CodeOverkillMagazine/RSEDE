module.exports = function(app) {
    const uploaddata = require('../models/csvupload.js');

    var bodyParser = require('../node_modules/body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    var fs = require('fs');

    app.get('/',function(req,res){
        var successmsg = req.flash('uploadmsg');
        var errmsg = req.flash('uploaderrmsg');
        res.render("index",{successmsg: successmsg,errmsg: errmsg});
    });
    app.post('/save',urlencodedParser,async(req,res)=>{
        if(req.files) {
            var file = req.files.uploaded_file;
            if(file != undefined) {
                var fileType = file.mimetype;
                if(fileType == "text/csv") {
                    var invalidsize = file.truncated;
                    if(!invalidsize) {
                        var filename = req.body.file_type+'.csv'
                        let postObj = {
                            'file_type': req.body.file_type,
                            'uploaded_file': filename
                        }
                        file.mv(__dirname + '/../validation/' + filename, function(err) {
                            if (err)
                                throw err;
                            
                        })
                        const checkAvailibity = await uploaddata.query().where('uploaded_file','=',filename);
                        if(!checkAvailibity.length) {
                            const adddata = await uploaddata.query().insert(postObj);
                        }
                        req.flash('uploadmsg', 'File Uploaded Successfully');
                    }
                    else {
                        req.flash('uploaderrmsg', 'Please select a File of size less than or equal to 2MB');
                    }
                } else {
                    req.flash('uploaderrmsg', 'Select a valid CSV file');
                }
            } else {
                req.flash('uploaderrmsg', 'Please select a file to upload');
            }
            res.redirect('/');
        }
    })
    app.get('/preview',async(req,res)=>{
        const uploadedFiles = await uploaddata.query();
        var previewFile = req.query.file;
        var fileData = [];
        if(previewFile) {
            if(fs.existsSync(__dirname + '/../validation/'+previewFile)) {
                csvRead.fromPath(__dirname + '/../validation/'+previewFile,{headers : false}).on("data", function(data){
                    fileData.push(data);
                })
                .on("end", function(){
                    res.render("preview",{uploadFilesData: uploadedFiles,fileContent: fileData,previewFile: previewFile});
                });
            }
            else {
                res.render("preview",{uploadFilesData: uploadedFiles,fileContent: fileData,fileerrormsg: 'File not found'})
            }
        }
        else {
            res.render("preview",{uploadFilesData: uploadedFiles,fileContent: fileData})
        }
    })
}