"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_merge_1 = __importDefault(require("lodash.merge"));
(_a = process.env).NODE_ENV || (_a.NODE_ENV = 'development');
var stage = process.env.STAGE || 'local';
var envConfig;
if (stage === 'production') {
    envConfig = require('./prod').default;
}
else if (stage === 'testing') {
    envConfig = require('./testing').default;
}
else {
    envConfig = require('./local').default;
}
console.log({ stage: stage, envConfig: envConfig });
exports.default = (0, lodash_merge_1.default)({
    stage: stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secret: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL,
    },
}, envConfig);
//# sourceMappingURL=index.js.map