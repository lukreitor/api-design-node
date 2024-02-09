"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); //
var router_1 = __importDefault(require("./router")); //
var morgan_1 = __importDefault(require("morgan")); // it is a logger middleware
var cors_1 = __importDefault(require("cors")); // it is a middleware that allows or denies requests based on the origin of the request, cors means cross origin resource sharing, it is a security feature of the browser
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1.default)(); // what does this line do? creates an instance of the express server
app.use((0, cors_1.default)()); // it allows all requests to come in, if we want to restrict it, we can pass an object with the origin property set to the url we want to allow
app.use((0, morgan_1.default)('dev')); // fit logs the request to the console
app.use(express_1.default.json()); // it parses the request body and makes it available in req.body, now the browser and we can exchange json data
app.use(express_1.default.urlencoded({ extended: true })); // it parses the request body and makes it available in req.body, now the browser and we can exchange json data
app.use(function (req, res, next) {
    req.shhhhhhh_secret = 'shhhhhhh';
    next();
}); // any single request that comes in, we are going to add a property to the request object called shhhhhhh_secret
app.get('/', function (req, res) {
    console.log('GET request received');
    res.json({ message: 'hello' });
});
app.use('/api', auth_1.protect, router_1.default);
app.post('/user', user_1.createNewUser);
app.post('/signin', user_1.signin);
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        return res
            .status(401)
            .json({ message: err.message, code: 'unauthorized' });
    }
    else if (err.type === 'validation') {
        return res.status(400).json({ message: err.message });
    }
    else if (err.type === 'entity') {
        return res.status(404).json({ message: err.message });
    }
    else if (err.type === 'prisma') {
        return res.status(500).json({ message: 'something went wrong' });
    }
    else if (err.type === 'input') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'something went wrong' });
});
exports.default = app;
// how to open a new cmd window in the current directory
// in the terminal, type cmd and press enter
//# sourceMappingURL=server.js.map