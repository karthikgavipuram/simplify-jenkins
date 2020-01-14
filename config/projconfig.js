const config = {
    "production":{
        redirectUrls : ["http://localhost:4444"],
        mongoAuthUrl : "mongodb://localhost:27017/authserver",
        mongoCvUrl: "mongodb://localhost:27017/cv"
    },
    "default":{
        redirectUrls : ["http://localhost:4444"],
        mongoAuthUrl : "mongodb://localhost:27017/authserver",
        mongoCvUrl: "mongodb://localhost:27017/cv"
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}