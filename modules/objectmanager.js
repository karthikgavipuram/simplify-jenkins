var ObjectManager = function() {}
var collections = ["user"]
var objectManager = new ObjectManager();
var jwt = require('jsonwebtoken');
var mongo = require('mongodb');
var mongojs = require('mongojs')
const projectconfig = require('../config/projconfig').get(process.env.NODE_ENV)
var db = mongojs(projectconfig.mongoCvUrl,collections)

ObjectManager.prototype.getObjects = function(objType, filterField, filterValue, callback) {
    var intFields = ["userId"];

    var query = {};
    if (intFields.indexOf(filterField) > -1) {
        query[filterField] = parseInt(filterValue);
    } else {
        // query[filterField] = { $regex: filterValue, $options: 'i' };
        query[filterField] = new RegExp("^" + filterValue + "$", 'i');
    }
    db[objType].find(query, function(err, data) {

        if (err || !data) {
            console.log("No data found");
            callback(err);
        } else {
            callback(undefined, data);
        }
    });
}

ObjectManager.prototype.getNextSequence = function getNextSequence(objValue, cb) {
    db.sequence.findAndModify({
        query: { "_id": objValue },
        update: { $inc: { "seq": 1 } },
        new: true,
        upsert: true
    }, function (err, doc) {
        cb(err, doc);
    });
}

ObjectManager.prototype.updateUser = function (objValue, cb) {
    const tmpId = parseInt(objValue.userId);
    var updateFields = objValue.updateFields;
    updateFields.updatedOn = new Date();
    db['user'].findAndModify({
        query: { userId: tmpId },
        update: { $set: updateFields },
        new: true
    }, function (err, doc, lastErrorObject) {
        if (err) {
            cb(err);
        } else {
            cb(undefined, JSON.parse(JSON.stringify(doc)));
            if (!doc) {
                return;
            }
            delete doc._id;
            var objTypeHistory = 'user_history';
            objectManager.saveObjectHistory(objTypeHistory, doc, function (err, done) {
                if (err) {
                    console.log("history oject not saved");
                } else {

                }
            });
        }
    });
}

ObjectManager.prototype.saveObjectHistory = function (objType, objValue, cb) {
    if (objValue) {
        db[objType].insert(objValue, function (err, saved) {
            if (err || !saved) {
                cb(err);
            } else {
                cb(undefined, saved);
            }
        });
    } else {
        cb("no data found");
    }
}

ObjectManager.prototype.search = function (objValue, cb) {
    db[objValue.collection].find(objValue.query, function (err, saved) {
        if (err || !saved) {
            cb(err);
        } else {
            cb(undefined, saved);
        }
    });
}

module.exports = ObjectManager;
