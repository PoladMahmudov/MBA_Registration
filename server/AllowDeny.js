Profile.allow({
  insert: function (userId, doc) {
  	if(userId){
  		let user = Profile.findOne({userId: userId});
  		if(!user){
  			return true
  		}
  	}
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
});


Settings.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
});


Groups.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
});


Courses.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
});