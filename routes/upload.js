var express = require('express');
var router = express.Router();
const spawn = require("child_process").spawn;
var fileSystem = require('fs');
var path = require('path')
var ObjectManager = require('../modules/objectmanager')
var objManager = new ObjectManager();

function create_structure(parsed_cv,id) {	
    let obj
    objManager.search({collection : "user", query : {userId : id}}, function(err,data){
        if (err){}
        else {
            if(data.length) {
                obj = data[0].cvdetails.builderDetails
                if (parsed_cv.name) obj.personal_info.basic_information.full_name = parsed_cv.name
                if (parsed_cv.email) obj.personal_info.basic_information.email_id = parsed_cv.email
                if (parsed_cv.mobile_number) obj.personal_info.basic_information.mobile_number = parsed_cv.mobile_number
                return obj
            }
        }
    })


}

router.post('/uploadResume', async function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }
    let id = req.body.userId
    let folderPath = "/root/cvupload";
    if (!fileSystem.existsSync(folderPath)) {
        fileSystem.mkdirSync(folderPath);
    }
    let uid = 100000 + Math.floor(Math.random() * 900000)
    let filename = `CV-user${id}-${uid}`
    filename += req.files["file"].name.substr(req.files["file"].name.indexOf("."), req.files["file"].name.length)
    let filepath = folderPath + "/" + filename;
    let usfile = req.files["file"];
    await usfile.mv(filepath);
    let cwd = path.resolve(folderPath)
    const ls = spawn("python",["../python/parser.py",filepath],{shell: true});
    ls.stdout.setEncoding('utf8').on("data",function (parsed_cv) {
        parsed_cv = parsed_cv.replace(/'/g, '"').replace(/None/g, '"empty"');
        parsed_cv = JSON.parse(parsed_cv);
        let structure2save = create_structure(parsed_cv,id);
        let update = {
            collection : "user",
            query : {
                userId : id
            },
            updateFields: {
                "cvdetails": {
                    "downloadPath": filepath,
                    "name": req.files["file"].name,
                    "parsedCv": parsed_cv,
                    "builderDetails": structure2save
                }
            }
        }
        objManager.updateObject(update,function(err,success){
            if (err){
                res.status(500).json({success : false, error : "error while updating user"})
            }
            else {
                res.status(200).json({ success: true});
            }
        })
    });

    ls.stderr.setEncoding('utf8').on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
});


module.exports = router