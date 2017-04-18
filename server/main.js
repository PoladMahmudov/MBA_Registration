import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	if(!Meteor.users.findOne() && !Settings.findOne({tag:'studentId'})){
		Settings.insert({
			studentId: "adminSuper",
			activated: false,
			createdAt: new Date(),
			tag: "studentId"
		});
	}
	if(!Settings.findOne({tag:'enrollments'})){
		Settings.insert({
			allow: false,
			tag: "enrollments"
		});
	}


///////////////////////////////////////
/////////   FOR DEPLOYMENT
//////////////////////////////////////


	if(!Profile.findOne({})){
		Profile.insert({
			allow: false,
			tag: "enrollments"
		});
		Meteor.setTimeout(function(){
			Profile.remove();
		}, 1000);
	}
	if(!Courses.findOne({})){
		Courses.insert({
			allow: false,
			tag: "enrollments"
		});
		Meteor.setTimeout(function(){
			Courses.remove();
		}, 1000);
	}
	if(!Groups.findOne({})){
		Groups.insert({
			allow: false,
			tag: "enrollments"
		});
		Meteor.setTimeout(function(){
			Groups.remove();
		}, 1000);
	}
	if(!Temporary.findOne({})){
		Temporary.insert({
			allow: false,
			tag: "enrollments"
		});
		Meteor.setTimeout(function(){
			Temporary.remove();
		}, 1000);
	}
});
