Template.MarkStudents.onCreated(function(){
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Profile");
	});
});

Template.MarkStudents.helpers({
	group: function(){
		return Groups.find({active: true}, {sort:{ createdAt: -1}});
	}
});

Template.MarkStudents.events({
	
});