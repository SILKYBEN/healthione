/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	 autoCreatedAt: false,
  	autoUpdatedAt: false,

  attributes: {

  	title: {
  		type: 'string',
  		required: true
  	},

    nick:{
      type: 'string',
      required: true
    },
    creator: {
      model: 'user'
    },
    articleAnswers: {
      collection: 'articleAnswer',
      via:'owner'
    },

  	description:{
  		type: 'string'
  	},
  	avatarUrl:{
  		type: 'string'
  	},
  	fd:{
  		type: 'string'
  	},
  	
  	imageName:{
  		type: 'string'
  	},
  	dateCreated:{
      type: 'string',
        // defaultsTo: function() {return new Date();}
        defaultsTo: function() {
          var date = new Date();

    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var day  = week[date.getDay()];
    var dd   = date.getDate();
    var mm   = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var hour = date.getHours();
    var minu = date.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu }

    
  benDay= day+' - '+dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
  return benDay;
  
}
  		// type: 'string'
  	}

  }
};

