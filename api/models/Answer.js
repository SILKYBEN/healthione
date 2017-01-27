/**
 * Answer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	  autoCreatedAt: false,
  	autoUpdatedAt: false,

  attributes: {

  	nick: {

  		type: 'string'
  	},
    // owner: {

    //   type: 'json'
    // },

  	questionId:{

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
  	},
  owner: {
      model: 'blog'
    },
  articleOwner: {
      model: 'article'
    },

  	comment:{

  		type: 'string'
  	}

  }

  //   afterCreate: function(values, next){
  //   if (req.session.answer){
  //     // values.nick=req.session.user.nick;
  //     values.questionId = req.session.answer.creator;
  //     next();
  //   } else {

  //     res.send ("before i create error in answer model");
  //   }
   
  // }



  // }
};

