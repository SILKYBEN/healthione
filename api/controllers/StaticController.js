/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		index : function(req, res, next){

			User.find (function foundUsers(err, users) {
			if (err) return next(err);
			if (!users) return next();

			// req.session.User = users;
			// req.session.authenticated=true;
			//if (!user) return next();
			
			
			//res.json(user);
			//res.redirect('/user/show/'+user.id);
			Blog.find (req.params.all()).sort('id DESC').limit(4).exec(function foundPost(err, blog) {
			if (err) return next(err);

				//res.redirect('/user/show/'+user.id);
			Article.find (req.params.all()).sort('id DESC').limit(3).exec(function foundArticle(err, article) {
			if (err) return next(err);
			// req.session.authenticated=true;
			//if (!user) return next();
				Answer.find (req.params.all()).sort('id DESC').limit(3).exec(function foundAnswer(err, answer) {
				if (err) return next(err);
				// req.session.authenticated=true;
				//if (!user) return next();
			return res.view({
				answer:answer,
				article:article,
				blog:blog,
				users:users
			});
			
			//res.json(user);
			//res.redirect('/user/show/'+user.id);
		

	
		});


		});
			});

	
		});
	

				

	}
	
};

