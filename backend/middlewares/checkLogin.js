// external imports
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

// internal imports
// const Role = require('../../models/Role');

// check login
const checkLogin = (req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length === 0 ? null : req.signedCookies;

    if (cookies) {
        try {
            const token = cookies['project_pulse'];
            const decoded = jwt.verify(token, 'top_secret_code');
            req.user = decoded;
            console.log('User authenticated.');
            next();
        } catch (error) {
            console.log(error);
            next(createError(401, 'Authentication failed.'));
        }
    }
    else {
        console.log('Cookie not found.');
        next(createError(401, 'Cookie not found.'));
    }
}

// guard to protect routes
function requirePermission(permission) {
    // user has roleID, then Role has permissions. If user has permission, then user can access the route.
    return async (req, res, next) => {
        try {
            // get user roleIDs
            const roleID = req.user.roleID;
            // get all roles
            const role = await Role.findOne({ roleID: roleID });
            // get all permissions
            let permissions = [];
            role.forEach(role => {
                permissions = permissions.concat(role.permissions);
            });
            // check if user has permission
            const isPermitted = permissions.includes(permission);
            if (isPermitted) {
                next();
            } else {
                next(createError(403, 'User does not have permission.'));
            }
        }
        catch (error) {
            next(createError(500, 'Something went wrong.'))
        }
    }
}

// export middlewares
module.exports = {
    checkLogin,
    requirePermission
};
