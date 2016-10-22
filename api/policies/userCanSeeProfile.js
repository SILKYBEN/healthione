module.exports = function(req, res, next) {

  var sessionUserMatchesId = req.session.User.id === req.param('id');
  var isAdmin = req.session.User.admin;

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (! sessionUserMatchesId || isAdmin) {

    var noRights = [{name: 'Admin Right Required', message:' You have no Right to go there.'}]
    req.session.flash = {
      err: noRights
    }
    res.redirect('/session/new');
    return;
    
  }
  return next();
  //user is not allowed
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};