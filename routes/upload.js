var express = require('express');
var router = express.Router();
const spawn = require("child_process").spawn;
var fileSystem = require('fs');
var path = require('path')
var ObjectManager = require('../modules/objectmanager')
var objManager = new ObjectManager();

function create_structure(parsed_cv) {	
    let obj = {
        "personal_info" : {
            "basic_information" : {
                "full_name" : "",	
                "dob" : "",
                "current_location" : "",
                "mobile_number" : "",
                "alt_number" : "",
                "email_id" : ""
            },
            "job_info" : {
                "total_exp" : "",
                "relocation" : false,
                "preferred_location" : "",
                "current_ctc" : "",
                "expected_ctc" : "",
                "notice_period" : "",
                "visa_status" : {
                    "country" : "",
                    "type" : "",
                    "expires" : ""
                }
            }
        },
        "eductation" : [{
            "institution" : "",
            "level" : "",
            "location" : "",
            "course" : "",
            "from" : "",
            "to" : "",
            "grade" : ""
        }],
        "skills" : [{
            "name" : "",
            "expertise_level" : "",
            "years" : ""
        }],
        "projects" : [{
            "name" : "",
            "role" : "",
            "domain" : "",
            "type" : "",
            "summary" : "",
            "responsibility" : "",
            "from" : {
                "year" : "",
                "month" : ""
            },
            "to" : {
                "year" : "",
                "month" : ""
            },
            "skills_used" : [],
            "ongoing" : false
        }],
        "experience" : [{
            "company" : "",
            "designation" : "",
            "location" : "",
            "engagement_type" : "",
            "from" : {
                "year" : "",
                "month" : ""
            },
            "to" : {
                "year" : "",
                "month" : ""
            },
            "curently_working" : false
        }],
        "achievements" : [{
            "title" : "",
            "description" : "",
            "year" : ""
        }],
        "certifications" : [{
            "title" : "",
            "organization" : "",
            "issue_date" : "",
            "expires" : false,
            "expiry_date" : "",
            "credential_id" : "",
            "url" : ""
        }]
    }
        {
        if(parsed_cv.name)
            obj.personal_info.basic_information.full_name = parsed_cv.name
        if(parsed_cv.email)
            obj.personal_info.basic_information.email_id = parsed_cv.email
        if(parsed_cv.mobile_number) 
               obj.personal_info.basic_information.mobile_number = parsed_cv.mobile_number	
        }//basic_info 
        return obj


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
    const ls = spawn("python3",["parser.py",filepath],{shell: true});
    ls.stdout.setEncoding('utf8').on("data",function (parsed_cv) {
        parsed_cv = parsed_cv.replace(/'/g, '"');
        parsed_cv = parsed_cv.replace(/None/g, '"empty"');
        parsed_cv = JSON.parse(parsed_cv);
        let structure2save = create_structure(parsed_cv);
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

    ls.stderr.on("data", data => {
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