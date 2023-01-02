"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DBNAME, MONGO_LOCAL, MONGO_CONNECTION_STRING, } = process.env;
let MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?authSource=admin`;
if (MONGO_LOCAL) {
    MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
}
exports.client = new mongodb_1.MongoClient(MONGO_CONNECTION_STRING || MONGO_URI);
exports.db = exports.client.db();
//# sourceMappingURL=db.js.map