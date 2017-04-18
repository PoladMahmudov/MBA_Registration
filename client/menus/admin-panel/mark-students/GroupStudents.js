Template.GroupStudents.onCreated(function(){
	var self = this;
	this.editMode = new ReactiveVar(false);
	self.autorun(()=>{
		self.subscribe("Groups");
		self.subscribe("Profile");
	});
});

Template.GroupStudents.helpers({
	subjectLabel: function(subjectId){
		let course = Courses.findOne({_id: subjectId});
		if (course) {
			return course.cNumber + '-' + course.cName
		}
	},
	editMode: function(){
		return Template.instance().editMode.get();
	}
});


Template.GroupStudents.events({
	'click .open-table':function(event, template){
		template.editMode.set(!template.editMode.get());
	}
});