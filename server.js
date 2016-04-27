var net = require("net");
var server = net.createServer();
var users = [];
var tools = require("./lib/tools")(users);


server.on('connection', function (conn) {
    conn.setEncoding("utf8");
    conn.write("Hello, what's your name?\r\n");
    users.push(conn);

    conn.data = '';
    conn.on('data', function (char) {
        char = char.toString();

        if (char.length > 0 && char.indexOf("\n") > -1 || char.indexOf("\r") > -1) {
            if (!conn.name) {
                conn.name = conn.data;
                tools.say(null, (conn.name + " joined"));
            } else {
                tools.say(conn, conn.name + " says: " + conn.data);
            }
            conn.data = '';
        } else {
            conn.data += char;
        }
    });

    conn.on('end', function () {
        tools.say(null, conn.name + " left");
        users.splice(users.indexOf(conn, 1));
    });

}).listen(8000);
console.log("Server running at port 8000...");

