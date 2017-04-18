var myPostSubmitFunc = function(userId, info){
	// declair the roles for users, the 1st signuped user is always admin, the others are just users
	let RegId = info.profile.studentId;
	if(Meteor.users.find().count()==1){
		// THIS USER IS GETTING ADMIN
		Roles.addUsersToRoles(userId, 'admin');
	}
	else{
		if(Settings.findOne({studentId: RegId}).idFor == 'teacher'){
			Roles.addUsersToRoles(userId, 'teacher');
		}
		else{
			Roles.addUsersToRoles(userId, 'student');
		}
	}
	//Settings.update({studentId: RegId}, {$set:{activated:true}});
	Settings.update({studentId: RegId, activated: false}, {$set:{activated:true}});
}

AccountsTemplates.configure({
	 postSignUpHook: myPostSubmitFunc // !!! it might be used for declaring admin or user roles
});
