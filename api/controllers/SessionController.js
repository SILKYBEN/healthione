/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function(req,res) {
		// var oldDateObj = new Date();
		// var newDateObj = new Date(oldDateObj.getTime() + 60000);
		// req.session.cookie.expires = newDateObj;

		// req.session.authenticated=true;
		// console.log(req.session);
		res.view('session/new');

		
		},

		create: function(req,res, next) {
			if (!req.param('email') || !req.param('password')){

				var usernamePasswordRequiredError = [{name: 'username and Password Required ' , message: 'invalid username or password '}]

				req.session.flash = {

					err: usernamePasswordRequiredError
				}

				// res.notFound('Sorry, you must enter email and password.');
 

				// if (err) return next(err);

				return res.redirect('/session/new');
				
			}
		// var oldDateObj = new Date();
		// var newDateObj = new Date(oldDateObj.getTime() + 60000);
		// req.session.cookie.expires = newDateObj;

		// req.session.authenticated=true;
		// console.log(req.session);
		User.findOne({email: req.param('email')}).exec (function (err,user){

			if (err) return next(err);

			//if no user is found
			if (!user){
				var noAccountError = [{name: 'No Account' , message: 'The email Adrress ' + req.param('email') + ' not found'}]
				req.session.flash = {

					err: noAccountError
				}
				

			return res.redirect('/session/new');
			}
			
			var bcrypt = require('bcryptjs');
			bcrypt.compare(req.param('password'), user.encryptedPassword, function (err,valid){
			if (err) return next(err);
			if(!valid) {

				var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch ' , message: 'invalid username or password ' + req.param('email') + 'not found'}]
				req.session.flash = {

					err: usernamePasswordMismatchError
				}
				// return next(usernamePasswordMismatchError);

			return res.redirect('/session/new');

			}

			req.session.authenticated=true;
			req.session.User = user;
			
			

			if (req.session.User.admin){
				req.session.authenticated=true;
				req.session.User = user;
				return res.redirect('/');
				
			}

			res.redirect('/');
		});
		

		
		//},

		

		});

	},
	destroy: function(req,res,next){

		req.session.destroy();
		res.redirect('/session/new');

	}
};

