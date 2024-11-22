"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ExpressApi = void 0;
var auth_1 = require("../../middleware/auth");
var permission_1 = require("../../middleware/permission");
var express_1 = require("express");
var requestLogger_1 = require("../../middleware/requestLogger");
var ExpressApi = /** @class */ (function () {
    function ExpressApi(routes) {
        this.app = express_1["default"]();
        this.route = express_1.Router();
        this.app.use(express_1["default"].json());
        this.addRoutes(routes);
        this.app.use("/api", this.route);
    }
    ExpressApi.create = function (routes) {
        return new ExpressApi(routes);
    };
    ExpressApi.prototype.addRoutes = function (routes) {
        var _this = this;
        routes.forEach(function (route) {
            var _a;
            var path = route.getPath();
            var method = route.getMethod();
            var handler = route.getHandler();
            var isauth = route.getAuth();
            var permission = route.getPermission();
            var middleware = __spreadArrays((isauth ? [auth_1.auth] : []), (permission !== 0 ? [permission_1.checkPermission(permission)] : []), [
                requestLogger_1.logger
            ]);
            (_a = _this.route)[method].apply(_a, __spreadArrays([path], middleware, [handler]));
            // this.app.use("/api")[method](path, ...middleware, handler);
        });
    };
    ExpressApi.prototype.start = function (port) {
        var _this = this;
        this.app.listen(port, function () {
            console.log("Server running on port " + port);
            _this.listRoutes();
        });
    };
    ExpressApi.prototype.listRoutes = function () {
        var routes = this.app._router.stack
            .filter(function (route) { return route.route; })
            .map(function (route) {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            };
        });
        console.log(routes);
    };
    return ExpressApi;
}());
exports.ExpressApi = ExpressApi;
