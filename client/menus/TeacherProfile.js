Template.TeacherProfile.onCreated(function(){
	var self = this;
	self.autorun(()=>{
		let id = FlowRouter.getParam('id');
		self.subscribe('Courses');
		if (Roles.userIsInRole(Meteor.userId(), "teacher")) {
			self.subscribe('ProfileSingle', id);
			if (self.subscribe('ProfileSingle', id).ready()) {
				let doc = Profile.findOne({userId: id});
				if (!doc) {
					FlowRouter.go("/registration-teacher");
				}
			}
		}
		if(Roles.userIsInRole(Meteor.userId(), 'student') || Roles.userIsInRole(Meteor.userId(), 'admin')){
			self.subscribe('TeachersProfile');
		}
	});
});

Template.TeacherProfile.helpers({
	profile:function(){
		let id = FlowRouter.getParam('id');
		if(id){
			let doc = Profile.findOne({userId: id});
			if (doc) {
				return doc
			}
		}
	},
	fields: function(){
		let teacherId = this._id;
		return Courses.find({disabled: false, "teachers.id": teacherId}, {sort:{cName:1}});
	},
	age: function(date){
		let formated = moment(new Date()).format("YYYY") - moment(date).format("YYYY");
		return formated;
	}
});

Template.TeacherProfile.events({
	'click .remove-user':function(){
		console.log(this)
		Meteor.call('RemoveUser', this._id, this.userId, this.groupUser);
	}
});

