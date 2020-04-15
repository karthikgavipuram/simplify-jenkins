var express = require('express');
var router = express.Router();
const spawn = require('child_process').spawn
var fileSystem = require('fs');
var path = require('path')

router.post('/uploadResume', async function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }
    let id = parseInt(req.body.userId)
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
    console.log('calling spawn')
    var ls = spawn("python3",["parser.py",filename],{shell: true, cwd:cwd});
    ls.stdout.on("data", data => {
        // create structure
        console.log('stdout')
        let structure2save = create_structure(data)
        res.status(200).json({ success: true, downloadUrl: filepath, org_name:req.files["file"].name, parsedCv: data, builder:structure2save});
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

function create_structure(json){
    let obj = {
        "basic_information":{
            "name":any,
            "dob" : any,
            "location" : any,
            "ph_number" : any,
            "relocation" : Boolean
        },
        "education" : [{}],
        "skills" : [{}],       
        "projects":[{}],
        "experience":[{}],
        "achievements":[{}],
        "certifications":[{}]
    }
    if(json.mobile_number) obj['basic_information'].ph_number = json.mobile_number
    return obj
}

module.exports = router