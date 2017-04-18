Template.Header.onCreated(function(){
	Session.setDefault('collapsed', false);
	let self = this;
	self.autorun(()=>{
		self.subscribe("Temporary");
	});
});

Template.Header.helpers({
	temporary: function () {
		return !!Temporary.findOne();
	},
	id:()=>{
		return Meteor.userId();
	}
});

Template.Header.events({
	'click .js-logOut':()=>{
		Meteor.logout();
		Session.set('collapsed', false);
	},
	'click .toggle-nav':()=>{
		Session.set('collapsed', true);
	},
	'click .toggle-back-nav':()=>{
		Session.set('collapsed', false);
	},
	'click .clicked-adress':()=>{
		Session.set('collapsed', false);
	}
});