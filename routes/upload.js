var express = require('express');
var router = express.Router();
var fileSystem = require('fs');
const ls = spawn("python3",["parser.py",doc],{shell: true});

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
    const ls = spawn("python3",["parser.py",doc],{shell: true});
    ls.stdout.on("data", data => {
        res.status(200).json({ success: true, downloadUrl: filepath, org_name:req.files["file"].name, parsedCv: data});
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