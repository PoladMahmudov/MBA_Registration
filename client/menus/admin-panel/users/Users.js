Template.Users.onCreated(function(){
	var self = this;
	Session.setDefault('OpenStudentsList', false);
	Session.setDefault('OpenTeachersList', false);
	self.autorun(()=>{
		let id = FlowRouter.getParam('id');
		self.subscribe("Profile");
	});
});

Template.Users.helpers({
	studentsIndex: () => {
	  	return StudentsIndex
	},
	teachersIndex: () => {
	  	return TeachersIndex
	},
	date: function(date){
		return moment(date).format("DD.MM.YYYY");
	}
});

Template.Users.events({
	'click .open-studentList':function(){
		Session.set('OpenStudentsList', !Session.get('OpenStudentsList'));
	},
	'click .open-teachersList':function(){
		Session.set('OpenTeachersList', !Session.get('OpenTeachersList'));
	}
});


//var id = FlowRouter.getParam('id');