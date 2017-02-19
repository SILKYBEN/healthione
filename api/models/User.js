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

    age:{
      type: 'string'
        
    },

    nick:{
      type: 'string',
      required: true
    },
    gender:{
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
    moderator:{
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

  beforeValidate: function(values,next){
    if (typeof values.moderator !== 'undefined') {
      
    if (values.moderator === 'unchecked') {
        values.moderator = false;
      } else if (values.moderator[1] === 'on') {
        values.moderator=true;
      }


      
    }
    if (typeof values.admin !== 'undefined'){
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else if (values.admin[1] === 'on') {
        values.admin=true;
      }

     

    }

    next();
  },

  

  beforeCreate: function(values, next){

        var mdate = values.age.toString();
        var yearThen = parseInt(mdate.substring(0,4), 10);
        var monthThen = parseInt(mdate.substring(5,7), 10);
        var dayThen = parseInt(mdate.substring(8,10), 10);
        
        var today = new Date();
        var birthday = new Date(yearThen, monthThen-1, dayThen);
        
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();
        
        var year_age = Math.floor(differenceInMilisecond / 31536000000);
        var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        
       
        
        var month_age = Math.floor(day_age/30);
        
        day_age = day_age % 30;
        
        if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
            console.log("Invalid birthday - Please try again!");
        }

         values.age=year_age;

    if (!values.password || values.password != values.confirm){
      return next({err: ["PASSWORD DOESNT MATCH CONFIRMATION."]});
    }
    var bcrypts = require('bcryptjs');

    bcrypts.hash(values.password,10, function passwordEncrypted(err,encryptedPassword){
      if (err) return next(err);

      values.encryptedPassword=encryptedPassword;
      //user.encryptedPassword=values.encrptedPassword;

      // return values.encryptedPassword;
      next();
    });


 

        
  

    // var Age = require('machinepack-age');
    //       Age.calculate({
    //       dateOfBirth: values.age,
    //       }).exec({
    //       // An unexpected error occurred.
    //       error: function (err) {
           
    //       },
    //       // Invalid date format supplied (expected yyyy-mm-dd or instance of Date).
    //       invalidDateFormat: function () {
           
    //       },
    //       // OK.
    //       success: function (result) {
           
    //       },
    //       });

          // next();


  }
  


};

