/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
// 	setSession: function(req, res) { //#A
// req.session.blogId = req.param('sessionVar');
// return res.json(req.session.BlogId || 'not yet set');
// },
// getSession: function(req, res) { //#B
// return res.json(req.session.BlogId || 'not yet set');
// },
	'singleBlog': function(req, res, next){



						Blog.findOne(req.param('id')).populate('answers').populate('creator').exec( function (err,blog){

			if (err) return next(err); 
			if (!blog) return next();

			// req.session.authenticated=true;

			req.session.Blog = blog;

			console.log('single Blog session:',blog);
			console.log('single creator:',blog.creator.name);
			console.log('single answers:',blog.answers.comment);


										Answer.find({

											where: { questionId: req.session.Blog.id}

											}).populate('owner').exec(function (err, answer){

											if (err) return res.negotiate(err);

											req.session.Answer = answer;



											console.log('answer: ', answer);
											console.log('single creator nick:',blog.creator.nick);

											console.log('single answers:',blog.answers);

											// return answer;

											

											// console.log('new single answers:',answer.comment);
											// return res.json({id: createdAnswer.id});
 
					        	
			
			return res.view({
				blog:blog,
				answer:answer
				});
			});
			
		});

				// });
			// });


	// 		Answer.findOne({
	// 			id: req.session.Blog.id
	// 		},{

	// 		} function foundAnswer(err, answer){

	// 			 // User.update({
							 
	// // 						          id: req.session.User.id
	// // 						      }, {
							 
	// // 						          answers: user.answers 
	// // 						      })
							 
	// // 						        .exec(function(err){
							 
	// // 						          if (err) return res.negotiate(err);  						 
							 
							 
	// // 						          return res.json({id: createdAnswer.id}); 
							 
	// // 						        });
	
	// 		if (err) return next(err);
	// 		var blog = {

	// 			title: req.session.Blog.id

	// 		}
	// 		// req.session.Blog=blog;
	// 		//var header1 = Welcome to Ask Health Experts


	// 		res.view({
	// 			answer:answer
	// 			// blog:blog
	// 		});
	// 	//res.locals.flash = _.clone(req.session.flash);
	// 	//res.view();

	// 	});
		//req.session.flash = {};
		
		}, 
	


	'askExpert': function(req, res,next){
		// Blog.find (function foundPost(err, blog) {


			Blog.find(req.params.all()).sort('dateCreated DESC').populate('answers').populate('creator').exec(function foundPost(err, blog){
	
			if (err) return next(err);

			// req.session.authenticated=true;

			req.session.Blog = blog;
			console.log('blog own session:',blog);

				Answer.find({

											where: { questionId: req.session.Blog.id}

											}).populate('owner').exec(function (err, answer){

											if (err) return res.negotiate(err);

											req.session.Answer = answer;



											console.log('answer: ', answer);
											// console.log('single creator nick:',blog.creator.nick);

											console.log('single answers:',blog.answers);

											// return answer;

											

											// console.log('new single answers:',answer.comment);
											// return res.json({id: createdAnswer.id});
 
					        	
			
			return res.view({
				blog:blog,
				answer:answer
				});
			});

			// req.session.Blog=blog;
			// var detail = {



			// }
			// //req.session.Answer.questionId = req.session.Blog.id;

			//var header1 = Welcome to Ask Health Experts


			// res.view({
			// 	blog:blog
			// 	// user:user
			});
		//res.locals.flash = _.clone(req.session.flash);
		//res.view();

		// });
		//req.session.flash = {};
		
		},
	'askPatient': function(req, res){
		// var header2 = Welcome to Ask Patients or Caregivers
		//res.locals.flash = _.clone(req.session.flash);
		res.view();
		//req.session.flash = {};
		
		},
	// create: function(req, res, next){

	// 	Blog.create (req.params.all(), function foundPost(err, blog) {
	// 		if (err) return next(err);

	// 		req.session.authenticated=true;

	// 		req.session.Blog = blog;

	// 		res.redirect('/blog/askExpert');
	// 		//res.json(blog);
	// 	//res.locals.flash = _.clone(req.session.flash);
	// 	//res.view();

	// 	});
	// 	//req.session.flash = {};
		
	// 	},
	create: function(req, res, next){

				User.findOne({ id: req.session.User.id 
				}).exec(function(err, user){
		 
		      if (err) return res.negotiate; 
		 
		      if (!user) return res.notFound();

		      Blog.create({
		              title: req.param('title'), 
		              description: req.param('description'),
		              nick: req.session.User.nick, 
		              creator: user.id, 
		                    }).exec(function(err, createdBlog){ 

		                    	if (err) return res.negotiate(err); 

		                    	user.blogs.add(createdBlog.id);

		                    	user.save(function (err) {

		                    		if (err) return res.negotiate(err);

		                    		req.session.authenticated=true;

									req.session.Blog = createdBlog;

									User.findOne({ 
										id: req.session.User.id 
									}).populate('blogs').exec(function (err, user){

										if (err) return res.negotiate(err);
										console.log('user: ', user);

										Blog.findOne({
											id: createdBlog.id
										}).populate('creator').exec(function (err, blog){

											if (err) return res.negotiate(err);

											console.log('blog: ', blog);
											return res.json({id: createdBlog.id});
 
					        	});
							});


		                    	// user.blogs = []; 
		                    	// user.blogs.push({
		                    	// comment: req.param('comment'), 
		                    	// // title: req.param('title'),
		                    	// // description: req.param('description'),
		                    	// dateCreated: user.createdAt, 
		                    	// updated: user.updatedAt, 
		                    	// id: user.id
							 
						});
		            });
							 
							    // User.update({
							 
							    //       id: req.session.User.id
							    //   }, {
							 
							    //       answers: user.answers 
							    //   })
							 
							    //     .exec(function(err){
							 
							    //       if (err) return res.negotiate(err);  						 
							 
							 
							    //       return res.json({id: createdAnswer.id}); 
							 
							    //     });
							 
							      });
							 
							    // });



		// 	Answer.create (req.params.all(), function foundAnswer(err, answer) {
		// 	if (err) return next(err);

		// 	req.session.authenticated=true;

		// 	req.session.Answer = answer;

		// 	res.redirect('/answer/viewAnswer');




		// 	//res.json(blog);
		// //res.locals.flash = _.clone(req.session.flash);
		// //res.view();

		// });
		//req.session.flash = {};
		
		},

	showBlog: function(req,res,next){

		Blog.findOne(req.param('id'),function foundPost(err,blog){

			if (err) return next(err); 
			if (!blog) return next();

			req.session.authenticated=true;

			req.session.Blog = blog;
			
			res.view({
				blog:blog
			});
		});
	}
	
};


