const config = {
    "production":{
        
    },
    "default":{
        redirectUrl : ["https://cv.simplifyqa.com"],
        mongoCvUrl: "mongodb://db_cv:cvauth$er>r@172.105.58.154:27017/cv",
        jwt_secret: {
            "secretkey": "thisissecret"
        },
        email_set: {
            "smtp_host": "send.one.com",
            "smtp_port": 465,
            "secure": true,
            "mail_from": "noreply@simplify3x.com",
            "simplify3x_username": "noreply@simplify3x.com",
            "simplify3x_password": "simplify123"
        }
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}