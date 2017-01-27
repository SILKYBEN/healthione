/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	'viewAnswer': function(req, res, next){
		// Blog.find (function foundPost(err, blog) {

			// User.findOne({
			// 	id:req.session.User.id
			// }).populate('blogs')
			// .exec(function (err,user){
			// 	if (err) return res.negotiate(err);
			// 	if (!user) return res.notFound();

			// 	var user={
			// 		name:user.name

			// 	}

				// Blog.findOne({
				// 	id:req.session.Blog.id 
				// }).populate('answers')
				// .exec(function (err, blog){
				// 	if (err) return res.negotiate(err);
				// 	if (!blog) return res.notFound();

				// 	var blog = {
				// 		title:blog.title,
				// 		description:blog.description,
				// 		dateCreated:blog.dateCreated
				// 	}

					Answer.find({

						id: req.param('id')
					}).populate('owner').exec(function(err,answer){
						if (err) return res.negotiate(err);

						// console.log('owner:',owner);
						console.log('Answer:',answer);
						Blog.find({
								id:req.session.Blog.id 
							}).populate('answers')
							.exec(function (err, blog){
								if (err) return res.negotiate(err);
								if (!blog) return res.notFound();

								// var blog = {
								// 	title:blog.title,
								// 	description:blog.description,
								// 	dateCreated:blog.dateCreated
								// }
							req.session.authenticated=true;

							req.session.Blog=blog;

							req.session.Answer = answer;
							console.log('Answer:',answer);
							console.log('Answer session:',req.session.Answer);
							console.log('Blog session:',req.session.Blog);

						res.view({
							blog:blog,
							// user:user,
							answer:answer
							// blog:blog

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
	'showAnswer': function(req,res){
		res.view();
		
		},
	'showAnswer2': function(req,res,next){
		Answer.find(function foundUser(err,answer){
			if (err) return next(err); 
			if (!answer) return next();
			res.view({
				answer:answer
			});
		});
		// res.view();
		
		},

	// 'showAnswer2': function(req,res,next){
	// 					Answer.find({ 
	// 						// where: { nick: blog.creator.nick} 
	// 					}).populate('owner').exec(function (err, answer){

	// 										if (err) return res.negotiate(err);

	// 										req.session.Answer = answer;
	// 										console.log('answer: ', answer);
	// 										// console.log('single creator nick:',blog.creator.nick);

	// 										// console.log('single answers:',blog.answers);

	// 										// console.log('new single answers:',answer.comment);
	// 										// return res.json({id: createdAnswer.id});
 
					        	
			
	// 		res.view({
	// 			blog:blog,
	// 			answer:answer
	// 			});
	// 		});
	// 	// res.view();
		
	// 	},

		

	// create: function(req, res, next){

	// 			User.findOne({ id: req.session.User.id 
	// 			}).exec(function(err, user){
		 
	// 	      if (err) return res.negotiate; 
		 
	// 	      if (!user) return res.notFound();

		  //     Blog.findOne({ id: req.session.Blog.id 
				// }).exec(function(err, blog){
		 
		  //     if (err) return res.negotiate; 
		 
		  //     if (!blog) return res.notFound();

	// 	      Answer.create({
	// 	              comment: req.param('comment'), 
	// 	              // description: req.param('description'), 
	// 	              owner: { name: user.name }, 
	// 	                    }).exec(function(err, createdAnswer){ 

	// 	                    	if (err) return res.negotate(err); 

	// 	                    	user.answers = []; 
	// 	                    	user.answers.push({
	// 	                    	comment: req.param('comment'), 
	// 	                    	// title: req.param('title'),
	// 	                    	// description: req.param('description'),
	// 	                    	dateCreated: user.createdAt, 
	// 	                    	updated: user.updatedAt, 
	// 	                    	id: user.id
							 
	// 						        });
							 
	// 						    User.update({
							 
	// 						          id: req.session.User.id
	// 						      }, {
							 
	// 						          answers: user.answers 
	// 						      })
							 
	// 						        .exec(function(err){
							 
	// 						          if (err) return res.negotiate(err);  						 
							 
							 
	// 						          return res.json({id: createdAnswer.id}); 
							 
	// 						        });
							 
	// 						      });
							 
	// 						    });



	// 	// 	Answer.create (req.params.all(), function foundAnswer(err, answer) {
	// 	// 	if (err) return next(err);

	// 	// 	req.session.authenticated=true;

	// 	// 	req.session.Answer = answer;

	// 	// 	res.redirect('/answer/viewAnswer');




	// 	// 	//res.json(blog);
	// 	// //res.locals.flash = _.clone(req.session.flash);
	// 	// //res.view();

	// 	// });
	// 	//req.session.flash = {};
		
	// 	},
	create: function(req, res, next){

				User.findOne({ id: req.session.User.id 
				}).exec(function(err, user){
		 
		      if (err) return res.negotiate; 
		 
		      if (!user) return res.notFound();
		      Blog.findOne({ id: req.session.Blog.id 
				}).exec(function(err, blog){
		 
		      if (err) return res.negotiate; 
		 
		      if (!blog) return res.notFound();

		      Answer.create({
		              comment: req.param('comment'), 
		              // description: req.param('description'), 
		                 questionId: req.session.Blog.id, 
		                 nick: req.session.User.nick
		                    }).exec(function(err, createdAnswer){ 

		                    	if (err) return res.negotiate(err); 

		                    	blog.answers.add(createdAnswer.id);

		                    	blog.save(function (err) {

		                    		if (err) return res.negotiate(err);

		       //              		req.session.authenticated=true;

									// req.session.Blog = createdBlog;
									User.findOne({ 
										id: req.session.User.id 
									}).populate('blogs').exec(function (err, user){

										if (err) return res.negotiate(err);
										console.log('user: ', user);

									Blog.findOne({ 
										id: req.session.Blog.id 
									}).populate('answers').exec(function (err, blog){

										if (err) return res.negotiate(err);
										console.log('blog: ', blog);

									

										Answer.findOne({
											id: createdAnswer.id
										}).populate('owner').exec(function (err, answer){

											if (err) return res.negotiate(err);

											console.log('answer: ', answer);
											return res.json({id: createdAnswer.id});
 
					        	});
							});
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
	editAnswer: function(req, res, next){

				Answer.findOne({ id: req.param('id')
				}).exec(function(err, foundAnswer){
		 
		      if (err) return res.negotiate; 
		 
		      if (!user) return res.notFound();

		      User.findOne({

		      				id: req.session.User.id

		              // comment: req.param('comment'), 
		              // description: req.param('description'), 
		              // owner: { name: user.name }, 
		                    }).exec(function(err, user){ 

		                    	if (err) return res.negotate(err);

		                    	if (!user) {

		                    		sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
 
         						 return res.redirect('/blog/askExpert');
 
       						}

       						if (user.name !== foundAnswer.owner.name) { 

       							return res.redirect('/blog/askExpert');

       						}
 
 
 
        return res.view('viewAnswer', {   

        	user: {
 
            // gravatarURL: foundUser.gravatarURL,
 
            name: user.name,
 
            admin: user.admin
 
          },
 
         answer : {
 
            id: foundAnswer.id,
 
            title: foundAnswer.title,
 
            description: foundAnswer.description,
 
          }
 
        });
 
      });
 
    });
 
  },

 

		//                     	user.tutorials = []; 
		//                     	user.tutorials.push({
		//                     	comment: req.param('comment'), 
		//                     	// title: req.param('title'),
		//                     	// description: req.param('description'),
		//                     	dateCreated: user.createdAt, 
		//                     	updated: user.updatedAt, 
		//                     	id: user.id
							 
		// 					        });
							 
		// 					    User.update({
							 
		// 					          id: req.session.User.id
		// 					      }, {
							 
		// 					          tutorials: user.tutorials 
		// 					      })
							 
		// 					        .exec(function(err){
							 
		// 					          if (err) return res.negotiate(err);  						 
							 
							 
		// 					          return res.json({id: createdTutorial.id}); 
							 
		// 					        });
							 
		// 					      });
							 
		// 					    });



		// // 	Answer.create (req.params.all(), function foundAnswer(err, answer) {
		// // 	if (err) return next(err);

		// // 	req.session.authenticated=true;

		// // 	req.session.Answer = answer;

		// // 	res.redirect('/answer/viewAnswer');




		// // 	//res.json(blog);
		// // //res.locals.flash = _.clone(req.session.flash);
		// // //res.view();

		// // });
		// //req.session.flash = {};
		
		// }
	
};

