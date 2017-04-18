Template.UserGroups.onCreated(function(){
	let self = this;
	self.autorun(()=>{
		let id = FlowRouter.getParam('id');
		self.subscribe("Courses");
		self.subscribe("ProfileSingle", id);
		self.subscribe("UserGroups", id);
		self.subscribe('TeachersProfile');
		if (self.subscribe('ProfileSingle', id).ready()) {
			let doc = Profile.findOne({userId: id});
			if (!doc && !Roles.userIsInRole(Meteor.userId(), "admin")) {
				FlowRouter.go("registration-2");
			}
		}
	});
});

Template.UserGroups.helpers({
	groups:()=>{
		let id = FlowRouter.getParam('id');
		let doc = Groups.find({"students.id": id, active: true});
		if (doc) {
			return doc
		}
	},
	userNotInGroup:function(){
		let id = FlowRouter.getParam('id');
		let doc = Groups.findOne({"students.id": id, active: true});
		if (!doc) {
			return true
		}
	},
	courseInfo: function(subjectId){
		let subject = Courses.findOne(subjectId);
		if (subject) {
			return subject.cNumber + ' - ' + subject.cName
		}
	},
	weekDay: function(day){
		if(day == 0){
			return 'Monday'
		}else if(day == 1){
			return 'Tuesday'
		}else if(day == 2){
			return 'Wednesday'
		}else if(day == 3){
			return 'Thursday'
		}else if(day == 4){
			return 'Friday'
		}
	},
	date:function(date){ 
		return moment(date).format("DD.MM.YYYY");
	},
	teacherId: function(id){
		let teacher = Profile.findOne(id);
		if (teacher) {
			return teacher.userId;
		}
	}
});