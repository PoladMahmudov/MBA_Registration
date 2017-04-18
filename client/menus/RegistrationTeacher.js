Template.RegistrationTeacher.onCreated(function(){
	let self = this;
	self.autorun(()=>{
		self.subscribe('ProfileSingle', Meteor.userId());
	});
});

Template.RegistrationTeacher.onRendered(function(){
	let self = this;
	self.autorun(()=>{
		let doc = Profile.findOne({userId: Meteor.userId()});
		if(doc){
			FlowRouter.go('/profile-teacher/' + Meteor.userId());
		}
		if(!Roles.userIsInRole(Meteor.userId(), 'teacher')){
			if(Roles.userIsInRole(Meteor.userId(), 'student')){
				FlowRouter.go('/profile/' + Meteor.userId());
			}
		}
	});
});