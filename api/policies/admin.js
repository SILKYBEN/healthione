module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.User && req.session.User.admin) {
    return next();
  }
  //user is not allowed
  else {
  	var requireAdminError = [{name: 'Admin Access Required', message:' You Must Be an admin.'}]
  	req.session.flash = {
  		err: requireAdminError
  	}
  	res.redirect('/session/new');
  	return;
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
