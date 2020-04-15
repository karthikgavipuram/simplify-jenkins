const express = require('express')
const app = express()
var path = require('path')
var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '5mb' }))
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const isAuthenticated = require("./controllers/isAuthenticated")
const projectconfig = require('./config/projconfig').get(process.env.NODE_ENV)
const session = require('express-session')
const fileUpload = require('express-fileupload');
var ObjectManager = require('./modules/objectmanager')
var objManager = new ObjectManager();
var cors = require('cors');

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}))

app.use(session({secret: 'Your secret key',saveUninitialized: true,resave: true}))
app.use(fileUpload());
app.get('/getCookie',function(req,res){
    if(req.cookies.ssoCookie) res.status(200).json({success:true,token:req.cookies.ssoCookie})
    else res.status(500).json({success:false , error: "No cookie"})
})



app.use('/setCookie',(req, res, next)=>{
    res.header("Access-Control-Allow-Origin",  projectconfig.redirectUrl[0]);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,token,Origin,X-Origin,X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
})
app.get('/setCookie',function(req,res){
    var {ssoToken} = req.query
    if(!ssoToken) return res.status(400).json({ message: "badRequest" })
    res.cookie("ssoCookie", ssoToken,{ maxAge: 1000 * 600000 * 10, httpOnly: false, SameSite:'None'})
    return res.status(200).json({ success: true })
})

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,token,Origin,X-Origin,X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
})




app.get(['/','/home','/profilebuilder','/cvupload'],(req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,token,Origin,X-Origin');
    res.sendFile('index.html', { root: __dirname + '/simplifycv/dist/' });
})

app.use(express.static(path.join(__dirname, 'simplifycv/dist')))

app.post('/updateUser', function(req,res){
    objManager.updateUser(req.body,function(err,data){
        if(err){
            res.status(500).json({success:false, error:err})
        }else{
            res.status(200).json({success:true, data:data})
        }
    })
})

app.post('/getData', function(req,res){
    objManager.search(req.body,function(err,data){
        if(err){
            res.status(500).json({success:false, error:err})
        }else{
            res.status(200).json({success:true, data:data})
        }
    })
})

var uploadRouter = require('./routes/upload');
app.use('/upload',uploadRouter)

app.get('/logout',function(req,res){
    res.clearCookie('ssoCookie')
    res.status(200).json({success:true})
})

app.use((err, req, res, next) => {
    console.error({
      message: err.message,
      error: err
    })
    const statusCode = err.status || 500
    let message = err.message || "Internal Server Error"
  
    if (statusCode === 500) {
      message = "Internal Server Error"
    }
    res.status(statusCode).json({ message })
})

app.listen(4445, function(){
    console.log("server deployed on http://%s:%s", this.address().address, this.address().port)
})
  

