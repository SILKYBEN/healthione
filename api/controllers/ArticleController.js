/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'newArticle': function(req, res){
		//res.locals.flash = _.clone(req.session.flash);
		res.view();
		//req.session.flash = {};
		
		},



	'singleArticle': function(req, res, next){



						Article.findOne(req.param('id')).populate('articleAnswers').populate('creator').exec( function (err,article){

			if (err) return next(err); 
			if (!article) return next();

			// req.session.authenticated=true;

			req.session.Article = article;

			// console.log('single Article session:',article);
			// console.log('single creator:',article.creator.name);
			// console.log('single articleAnswers:',article.articleAnswers.comment);


										ArticleAnswer.find({

											where: { questionId: req.session.Article.id}

											}).populate('owner').exec(function (err, articleAnswer){

											if (err) return res.negotiate(err);

											req.session.ArticleAnswer = articleAnswer;



											console.log('articleAnswer: ', articleAnswer);
											console.log('single creator nick:',article.creator.nick);

											console.log('single answers:',article.articleAnswers);

											// return answer;

											

											// console.log('new single answers:',answer.comment);
											// return res.json({id: createdAnswer.id});
 
					        	
			
			return res.view({
				article:article,
				articleAnswer:articleAnswer
				});
			});
			
		});


		
		}, 
	

	newUpload: function(req, res) {
	// var user;
	    	    if (req.method === 'GET')
	        return res.json({ 'status': 'GET not allowed' });
	    //	Call to /upload via GET is error

	    var uploadFile = req.file('uploadFile');
	    // console.log(uploadFile);

	    uploadFile.upload({ dirname: '../../assets/images', saveAs: function(file, cb) { cb(null, file.filename);
  }, }, function onUploadComplete(err, files) {
	        //	Files will not be uploaded to .tmp/uploads

	        if (err) return res.serverError(err);
	         if (files.length === 0){
		      return res.badRequest('No file was uploaded');
		    }
		    avatarUrl: require('util').format('%s/assets/images/%s', sails.getBaseUrl(), req.session.User );
		    imageName: req.param('files[0].filename');

		    
		    	

		    	var filess = { //#C
								fd: req.param('files[0].fd'),
								imageName: req.param('files[0].filename')
		};
		// res.set("Content-disposition", "attachment; filename='" + file.name + "'");
		req.session.User.avatarFd = files[0].fd;
		req.session.User.avatarName = files[0].filename;
		// req.session.Article.imageName = files[0].filename;

		Article.update(req.session.Article, {

			    	// user.avatarFd = req.param('files[0].fd'),

			      // Generate a unique URL where the avatar can be downloaded.
			      // avatarUrl: require('util').format('%s/assets/images/%s', sails.getBaseUrl(), req.session.User ),

			      // Grab the first file and use it's `fd` (file descriptor)
			      imageName: files[0].filename

			    })
			    .exec(function (err){
			      if (err) return res.negotiate(err);

			       // console.log(req.session.User.avatarFd);
			       
			       // console.log('The image Name : ',imageName);
			       

			      // return res.ok();
			    });

		  // Save the "fd" and the url where the avatar for a user can be accessed
			    User.update(req.session.User, {

			    	// user.avatarFd = req.param('files[0].fd'),

			      // Generate a unique URL where the avatar can be downloaded.
			      // avatarUrl: require('util').format('%s/assets/images/%s', sails.getBaseUrl(), req.session.User ),

			      // Grab the first file and use it's `fd` (file descriptor)
			      avatarFd: files[0].fd

			    })
			    .exec(function (err){
			      if (err) return res.negotiate(err);

			       console.log(req.session.User.avatarFd);
			       console.log(req.session.User.avatarName);
			       

			      // return res.ok();
			    });
		
		    	res.redirect('/article');



		    	
	    });
	},

	index : function(req, res, next){

				
	 	Article.find (function foundArticles(err, articles) {
			if (err) return next(err);
			req.session.authenticated=true;
			//if (!user) return next();
			res.view({
				articles:articles
			});
			
			//res.json(user);
			//res.redirect('/user/show/'+user.id);
		

	
		});
	},

	destroy: function(req,res,next){
		Article.findOne(req.param('id'), function foundArticle(err, article){
			if (err) return next(err);
			if (!article) return next('article does not exist.');
			Article.destroy (req.param('id'), function articleDestroyed(err) {
				if (err) return next(err);
				});
			
			res.redirect('/article');
		});
	},

	create: function(req, res, next){

				User.findOne({ id: req.session.User.id 
				}).exec(function(err, user){
		 
		      if (err) return res.negotiate; 
		 
		      if (!user) return res.notFound();

		      Article.create({
		              title: req.param('title'), 
		              description: req.param('description'),
		              nick: req.session.User.nick, 
		              creator: user.id, 
		                    }).exec(function(err, createdArticle){ 

		                    	if (err) return res.negotiate(err); 

		                    	user.articles.add(createdArticle.id);

		                    	user.save(function (err) {

		                    		if (err) return res.negotiate(err);

		                    		req.session.authenticated=true;

									req.session.Article = createdArticle;

									User.findOne({ 
										id: req.session.User.id 
									}).populate('articles').exec(function (err, user){

										if (err) return res.negotiate(err);
										console.log('user: ', user);

										Article.findOne({
											id: createdArticle.id
										}).populate('creator').exec(function (err, article){

											if (err) return res.negotiate(err);

											console.log('Article: ', article);
											return res.redirect('/upload-file');
											// res.json({id: createdArticle.id});
 
					        	});
							});


		                    	
							 
						});
		            });
							 
							 
							      });
							 

		
		}
	
};

