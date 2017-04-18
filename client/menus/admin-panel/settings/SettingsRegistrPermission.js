Template.SettingsRegistrPermission.onCreated(function(){
	let permission;
	if (Settings.findOne({tag:'studentId', activated: 'delay'})) {
		permission = false;
	}
	else{
		permission = true;
	}
	Session.setDefault('reg-permission', permission);
});

Template.SettingsRegistrPermission.helpers({
	status:function(){
		return Session.get('reg-permission');
	}
});


Template.SettingsRegistrPermission.events({
	'click .js-stud-id':function(){
		Session.set('SettingsPage', 'StudId');
	},
	'click .js-regr-toggle':function(event){
		Session.set('reg-permission', !Session.get('reg-permission'));
		Meteor.call('ForbidReg', Session.get('reg-permission'), function (error, result) {
			Session.set('reg-permission', result);
		});
	}
});