Template.LogInSignUpLayout.onCreated(function(){
	let self = this;
	self.autorun(()=>{
		if(Roles.userIsInRole(Meteor.userId(), 'admin')){
			FlowRouter.go('Settings');
		}
		else if(Roles.userIsInRole(Meteor.userId(), 'teacher')){
				FlowRouter.go('/profile-teacher/' + Meteor.userId());
			}else
				FlowRouter.go('/profile/' + Meteor.userId());
	});
});