const config = {
    "production":{
        
    },
    "default":{
        redirectUrls : ["http://localhost:4444"],
        mongoCvUrl: "mongodb://172.105.58.154:27017/cv"
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}