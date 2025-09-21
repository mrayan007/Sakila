const createError = require('http-errors');

function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  // User is not logged in → create 401 error and pass to error handler
  return next(createError(401, 'Unauthorized: You must be logged in.'));
}

module.exports = requireAuth;
