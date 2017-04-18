Template.GroupsManagement.onCreated(function(){
	var self = this;
	Session.setDefault('showExactCourse', '');
	Session.setDefault('ShowAllGroups', false);
	Session.setDefault('UserBar', '');
	Session.setDefault('OpenBar', false);
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Temporary");
		self.subscribe("Profile");
		self.subscribe("Settings");
	});
});

Template.GroupsManagement.helpers({
	course: function(){
		if(Temporary.findOne()){
			let excludes = Temporary.find({}, {fields:{subject:1}}).fetch();
			let doc = Courses.find({disabled:false}, {sort:{cType: -1, cGroup: 1, cNumber: 1}}).fetch();
			let updatedDoc = doc.filter(function(eachCourse){
				let detected = false;
				excludes.forEach(function (eachSemSubject) {
					if(eachCourse._id == eachSemSubject.subject){
						detected = true;
					}
				});
				return detected;
			});
			if(updatedDoc){
				return updatedDoc	
			}
		}
	},
	enrollesStarted:()=>{
		return !!Temporary.findOne()
	},
	groups: function(){
		return Groups.find({}, {sort:{createdAt: -1, subject: 1}})
	}
});

Template.GroupsManagement.events({
	'click #selectCourse': function(event){
		Session.set('showExactCourse', event.target.value);
	},
	'click .btn-allGroups': function(){
		Session.set('ShowAllGroups', !Session.get('ShowAllGroups'));
	},
	'click .angle': function(){
		Session.set('OpenBar', !Session.get('OpenBar'));
	}
});