/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  //schema:true,

  attributes: {

  	name: {
  		type: 'string',
  		required: true
  	},

    nick:{
      type: 'string',
      required: true
    },

  	occupation:{
  		type: 'string'
  	},
  	phone:{
  		type: 'string'
  	},
  	email:{
  		type: 'string',
  		email: true,
  		required: true, 
  		unique: true
  	},
    // answers:{
    //   type: 'json'
    // },
    admin:{
      type: 'boolean',
      defaultsTo: false
      
    },
    blogs:{
      collection: 'blog'
      // via : 'user'
      
    },
     articles:{
      collection: 'article'
      // via : 'user'
      
    },
  	encryptedPassword:{
  		type: 'string'
  	},



      // returns 'The morning is upon us'

  	toJSON: function() {

  	var obj=this.toObject();
  		delete obj.password;
  		delete obj.confirm;
      delete obj.encrptedPassword;
  		delete obj._csrf;
  		return obj;
  	 } 





  },

  

  beforeCreate: function(values, next){
    if (!values.password || values.password != values.confirm){
      return next({err: ["PASSWORD DOESNT MATCH CONFIRMATION."]});
    }
    var bcrypts = require('bcryptjs');

    bcrypts.hash(values.password,10, function passwordEncrypted(err,encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword=encryptedPassword;
      //user.encryptedPassword=values.encrptedPassword;

      next();
    });
  }
  


};

