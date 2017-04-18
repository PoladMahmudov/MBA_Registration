Template.AddGroup.onCreated(function(){
	var self = this;
	this.showAllTeachers = new ReactiveVar(false);
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Temporary");
		self.subscribe("Profile");
	});
});

Template.AddGroup.helpers({
	Teachers: function(){
		if(!Template.instance().showAllTeachers.get()){
			let teachers = this.teachers;
			return teachers;
		}else{
			let arr = [];
			let teachers = Profile.find({groupUser: 'teacher'}).forEach(function (teacher) {
				let obj = {
					id: teacher._id,
				}
				arr.push(obj);
			});
			return arr
		}
	},
	fullName: function(id){
		let profile = Profile.findOne({_id: id});
		if(profile){
			let fullname = profile.surname + ' ' + profile.name + ' ' + profile.patronimyc;
			return fullname;
		}
	},
	days: function(){
		let subject = this._id;
		let teacher = Session.get('TeacherId');
		let arr = [
			{num: 0, day: "Monday"},
			{num: 1, day: "Tuesday"},
			{num: 2, day: "Wednesday"},
			{num: 3, day: "Thursday"},
			{num: 4, day: "Friday"},
		];
		let existGroups = Groups.find({subject: subject, "teacher.id": teacher, active: false}).fetch();
		if (existGroups.length) {
			let newArr = [];
			existGroups.forEach(function (group) {
				newArr = arr.filter(function(day){
					if(day.num == group.day){
						return false
					}
					return true
				});
			});
			return newArr;
		}else{
			return arr
		}
	}
});

Template.AddGroup.events({
	'click .show-all-teachers': function(event, template){
		template.showAllTeachers.set(!template.showAllTeachers.get());
	},
	'change select#teacher': function(event, template){
		Session.set('TeacherId',$("#teacher").val());
	},
	'submit #add-new-group-manually':function(event, template){
		event.preventDefault();
		let subject = this;
		let label = event.target.groupName.value;
		let teacher = $("#teacher").val();
		let day = $("#lessonDay").val();
		let profile = Profile.findOne({_id: teacher});
		let fullName = profile.surname + ' ' + profile.name + ' ' + profile.patronimyc;
		let teacherObj = {
			id: teacher,
			fullName: fullName
		}
		if (!label) {
			let defaultLabelPart = moment(new Date()).format("MMM Do YY");
			label = subject.cNumber + ' ' + defaultLabelPart + ' ' + fullName + ' ' + day;
		}
		let obj = {};
		if(subject && label && teacherObj && day){
			obj = {
				groupName: label,
				subject: subject._id,
				teacher: teacherObj,
				day: day,
				cHours: subject.cHours,
				createdAt: new Date(),
				students: [],
				active: false
			}
			Groups.insert(obj);
		}
	}
});