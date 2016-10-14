/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  attributes: {

  	name: {
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
  	encrptedPassword:{
  		type: 'string'
  	}



      // returns 'The morning is upon us'

  	// toJSON: function() {

  	// var obj=this.toObject();
  	// // 	delete obj.password;
  	// // 	delete obj.confirm;
  	// // 	delete obj.encrptedPassword;
  	// // 	delete obj._csrf;
  	// 	return obj;
  	//  }

  }
};

