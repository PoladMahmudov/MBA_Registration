Template.RegInfo.onCreated(function(){
	//Session.setDefault('reg-info', false);
	this.autorun(function(){
		Meteor.call('studentIdFind', function(err, result){
			Session.set('reg-info', result);
		});
		console.log("atForm: "+Session.get('reg-info'));
	});
});