/**
 * Created by Daniel on 2015-11-21.
 */
module.exports = function(users){
    var module = {};

    module.say = function (user, msg) {
        for (var i=0; i < users.length; i++) {
            if(users[i].writable && users[i] != user)
            users[i].write(msg + "\r\n");
        }
    };
    return module;
};