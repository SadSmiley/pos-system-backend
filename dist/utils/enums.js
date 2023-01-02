"use strict";
// create enums of http error codes
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorCode = void 0;
var HttpErrorCode;
(function (HttpErrorCode) {
    HttpErrorCode[HttpErrorCode["BadRequest"] = 400] = "BadRequest";
    HttpErrorCode[HttpErrorCode["Unauthorized"] = 401] = "Unauthorized";
    HttpErrorCode[HttpErrorCode["Forbidden"] = 403] = "Forbidden";
    HttpErrorCode[HttpErrorCode["NotFound"] = 404] = "NotFound";
    HttpErrorCode[HttpErrorCode["InternalServerError"] = 500] = "InternalServerError";
})(HttpErrorCode = exports.HttpErrorCode || (exports.HttpErrorCode = {}));
//# sourceMappingURL=enums.js.map