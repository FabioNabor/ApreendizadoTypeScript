"use strict";
exports.__esModule = true;
exports.logger = void 0;
exports.logger = function (request, response, next) {
    var method = request.method, url = request.url;
    var infUser = request.body.infUser;
    var timestamp = new Date().toISOString();
    var msg = "[" + timestamp + "] \u001B[32m" + method + "\u001B[0m \u001B[33m" + url + "\u001B[0m";
    if (infUser)
        msg = msg + (" \u001B[34m" + infUser.login + "\u001B[0m");
    response.on("finish", function () {
        console.log(msg + (" \u001B[35m" + response.statusCode + "\u001B[0m"));
    });
    next();
};
