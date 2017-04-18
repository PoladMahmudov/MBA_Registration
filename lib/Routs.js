if(Meteor.isClient){	
	/*it must have this package - gwendall:auth-client-callbacks*/
	Accounts.onLogin(function(){
		if(Roles.userIsInRole(Meteor.userId(), 'admin')){
			FlowRouter.go('Settings');
		}
		else if(Roles.userIsInRole(Meteor.userId(), 'teacher')){
				FlowRouter.go('/profile-teacher/' + Meteor.userId());
		}else if(Roles.userIsInRole(Meteor.userId(), 'student')){
			FlowRouter.go('/profile/' + Meteor.userId());
		}else
			FlowRouter.go('home');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

FlowRouter.triggers.enter([function(context,redirect){
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/',{
	name: "home",
	action(){
		BlazeLayout.render('LogInSignUpLayout');
	}
});

FlowRouter.route('/registration-2',{
	name: "registration-2",
	action(){
		BlazeLayout.render('MainLayout',{main:'Registration_2'});
	}
});

FlowRouter.route('/registration-teacher',{
	name: "registration-teacher",
	action(){
		BlazeLayout.render('MainLayout',{main:'RegistrationTeacher'});
	}
});

FlowRouter.route('/curriculum',{
	name: "curriculum",
	action(){
		BlazeLayout.render('MainLayout',{main:'CurriculumStudent'});
	}
});

FlowRouter.route('/enroll',{
	name: "enroll",
	action(){
		BlazeLayout.render('MainLayout',{main:'Enroll'});
	}
});

FlowRouter.route('/profile/:id',{
	name: 'profile',
	action(params, queryParams){
		/*console.log("id:", params.id);
        console.log("Query Params:", queryParams);*/
		BlazeLayout.render('MainLayout',{main: 'Profile'})
	}
});


FlowRouter.route('/profile-teacher/:id',{
	name: 'profile-teacher',
	action(params, queryParams){
		/*console.log("id:", params.id);
        console.log("Query Params:", queryParams);*/
		BlazeLayout.render('MainLayout',{main: 'TeacherProfile'})
	}
});

FlowRouter.route('/student-groups/:id',{
	name: 'student-groups',
	action(params, queryParams){
		/*console.log("id:", params.id);
        console.log("Query Params:", queryParams);*/
		BlazeLayout.render('MainLayout',{main: 'UserGroups'})
	}
});



/////////////////////////////////////////////////////
///////////////// ADMIN
/////////////////////////////////////////////////////


var adminDash = FlowRouter.group({
	prefix: '/admin',
	name: 'adminPanel'
});

adminDash.route('/settings', {
	name: 'Settings',
	action: function(){
		BlazeLayout.render('MainLayout', {main: 'Settings'})
	}
});

adminDash.route('/curriculum', {
	name: 'Curriculum-admin',
	action: function(){
		BlazeLayout.render('MainLayout', {main: 'Curriculum'})
	}
});

adminDash.route('/groups', {
	name: 'Groups',
	action: function(){
		BlazeLayout.render('MainLayout', {main: 'GroupsManagement'})
	}
});

adminDash.route('/mark-students', {
	name: 'Mark students',
	action: function(){
		BlazeLayout.render('MainLayout', {main: 'MarkStudents'})
	}
});

adminDash.route('/users', {
	name: 'users',
	action: function(){
		BlazeLayout.render('MainLayout', {main: 'Users'})
	}
});

