Template.AsideBar.onCreated(function(){
	Session.setDefault('UserBar', '');
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Temporary");
		self.subscribe("Profile");
	});
});

Template.AsideBar.helpers({
	tempTable: function(){
		let userId = Session.get('UserBar');
		let tempTable = [];
		if(userId){
			let temps = Temporary.find({"users.user": userId}).fetch();
			if (temps) {
				temps.forEach(function (temp) {
					let tempObj = {};
					temp.users.forEach(function (user) {
						if(user.user == userId){
							tempObj = {
								subject: temp.subject,
								day: user.day
							}
						}
					});
					tempTable.push(tempObj); 
				});
			}
		}
		return tempTable;
	},
	groupTable: function(){
		let userId = Session.get('UserBar');
		let groupTable = [];
		if(userId){
			let groups = Groups.find({"students.id": userId, active: false}).fetch();
			if (groups) {
				groups.forEach(function (group) {
					let groupObj = {
						groupName: group.groupName,
						day: group.day
					}
					groupTable.push(groupObj);
				});
			}
		}
		return groupTable;
	},
	cNumber: function(subId){
		let course = Courses.findOne(subId);
		if (course) {
			return course.cNumber
		}
	},
	weekDay:function(){
		let day = this.day;
		let arr = [];
		for (var i = 0; i < 5; i++) {
			let show = false;
			if(day == i){
				show = true;
			}
			arr.push({num: i, show: show});
		}
		return arr;
	},
	userName: function(){
		let userId = Session.get('UserBar');
		if (userId) {
			let profile = Profile.findOne({userId: userId});
			if(profile){
				return profile.surname + ' ' + profile.name + ' ' + profile.patronimyc;
			}
		}
	}
});

Template.AsideBar.events({

});