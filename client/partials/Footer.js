Template.Footer.onCreated(function(){
	Session.setDefault('collapsed', false);
	let self = this;
	self.autorun(()=>{
		self.subscribe("Temporary");
	});
});

Template.Footer.helpers({
	temporary: function () {
		return !!Temporary.findOne();
	},
	id:()=>{
		return Meteor.userId();
	}
});

Template.Footer.events({
	
});