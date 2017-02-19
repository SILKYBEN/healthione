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

											
 
					        	
			
			return res.view({
				blog:blog,
				answer:answer
				});
			});
			
		});

		
		}, 
	


	'askExpert': function(req, res,next){
		// Blog.find (function foundPost(err, blog) {


			Blog.find(req.params.all()).sort('id DESC').populate('answers').populate('creator').exec(function foundPost(err, blog){
	
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

			
			});
		
		
		},
	'askPatient': function(req, res){
		// var header2 = Welcome to Ask Patients or Caregivers
		//res.locals.flash = _.clone(req.session.flash);
		res.view();
		//req.session.flash = {};
		
		},

	index : function(req, res, next){

				
	 	Blog.find (function foundBlogs(err, blogs) {
			if (err) return next(err);
			req.session.authenticated=true;
			//if (!user) return next();
			res.view({
				blogs:blogs
			});
			
			//res.json(user);
			//res.redirect('/user/show/'+user.id);
		

	
		});
	},
	
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

											// console.log('blog: ', blog);
											return res.redirect('/blog/singleblog/'+blog.id);
 
					        	});
							});


		                    	
							 
						});
		            });
							 
							    
							 
							      });
							 
							   
		
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


