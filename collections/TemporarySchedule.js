Temporary = new Mongo.Collection('temporary');

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