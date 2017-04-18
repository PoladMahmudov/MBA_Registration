Template.Registration_2.onCreated(function(){
	let self = this;
	self.autorun(()=>{
		self.subscribe('ProfileSingle', Meteor.userId());
		self.subscribe('Meteor.users');
		self.subscribe('Settings');
		if(Roles.userIsInRole(Meteor.userId(), 'admin')){
			FlowRouter.go('Settings');
		}
		else if(Roles.userIsInRole(Meteor.userId(), 'teacher')){
			FlowRouter.go('/profile-teacher/' + Meteor.userId());
		}
	});
});

Template.Registration_2.onRendered(function(){
	let self = this;
	self.autorun(()=>{
		let doc = Profile.findOne({userId: Meteor.userId()});
		if(doc){
			FlowRouter.go('/profile/' + Meteor.userId());
		}
	});
});