Template.Settings.onCreated(function(){
	Session.setDefault('SettingsPage', 'StudId');
	var self = this;
	self.autorun(function(){
		self.subscribe("Courses");
		self.subscribe("TeachersProfile");
		self.subscribe("Temporary");
		self.subscribe("Settings");
		Meteor.call('studentIdFind', function(err, result){
			Session.set('reg-permission', result);
		});
	});
});

Template.Settings.events({
	'click .js-stud-id':function(){
		Session.set('SettingsPage', 'StudId');
	},
	'click .js-reg-permit':function(){
		Session.set('SettingsPage', 'RegPermit');
	},
	'click .js-student-schedule':function(){
		Session.set('SettingsPage', 'StudentSchedule');
	}
});