Meteor.publish('Profile', function(id){
	if(Roles.userIsInRole(this.userId, 'admin')){
		return Profile.find();
	}
	else {
		this.ready();
	}
});

Meteor.publish('Meteor.users', function (userIds) {
	if(Roles.userIsInRole(this.userId, 'admin')){
		return Meteor.users.find({});
	}
	else if (this.userId) {
    	return Meteor.users.find({_id: this.userId},{fields: {'profileId': 1}});
  	}
	else {
		this.ready();
	}
});

Meteor.publish('Settings', function(id){
	if(Roles.userIsInRole(this.userId, 'admin')){
		return Settings.find();
	}else if(this.userId){
		return Settings.find({$or:[{tag:'specialisation'}, {tag:'enrollments'}]});
	}
});

Meteor.publish('Courses', function(id){
	if(this.userId){
		return Courses.find({});
	}
});

Meteor.publish('Temporary', function(id){
	if(this.userId){
		return Temporary.find({});
	}
});

Meteor.publish('Groups', function(id){
	if(this.userId){
		return Groups.find({});
	}
});


Meteor.publish('ProfileSingle', function(id){
	if (Roles.userIsInRole(this.userId, 'admin') || id == this.userId) {
		return Profile.find({userId:id});
	}
});

Meteor.publish('UserGroups', function(id){
	if (Roles.userIsInRole(this.userId, 'admin') || id == this.userId) {
		return Groups.find({"students.id": id, active: true});
	}
});

Meteor.publish('TeachersProfile', function(){
	if (this.userId) {
		return Profile.find({groupUser: 'teacher'});
	}
});