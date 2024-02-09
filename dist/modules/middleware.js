"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErros = void 0;
var express_validator_1 = require("express-validator");
var handleInputErros = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req); // it checks if there are any errors in the request, here it checks if the name is a string
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(400); // bad request, the request is not valid
        res.json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.handleInputErros = handleInputErros;
//# sourceMappingURL=middleware.js.map