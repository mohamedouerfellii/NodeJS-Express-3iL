const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "dsfsD%65qsfsqdfDFG%sdf+sdfkjsdfg21Mqsdfp!sdgf";


module.exports = {
    generateTokenForUser: function (user) {
        return jwt.sign({
                profId: user.id,
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: "1h"
            }
        );
    },
    parseAuthorization: function (authorization) {
        if (authorization.indexOf('Bearer') !== 0) return null;
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);

        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    userId = jwtToken.userId;
                }
            } catch (err) {}
        }

        return userId;
    }
}