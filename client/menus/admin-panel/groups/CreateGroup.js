Template.CreateGroup.onCreated(function(){
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Temporary");
		self.subscribe("Profile");
	});
});

Template.CreateGroup.helpers({
	enrollActive:function(){
		let enrollStatus = Settings.findOne({tag: 'enrollments'});
		if(enrollStatus){
			return !enrollStatus.allow
		}
		else
			return false
	},
	InitialCreation: function(){
		let currentEnrollment = Temporary.findOne();
		if (currentEnrollment) {
			let groupExist = Groups.findOne({active: false, subject: this._id});
			if (groupExist) {
				return false
			}else
				return true
		}
	},
	eachTeacher: function(){
		let subject = Temporary.findOne({subject: this._id});
		if(subject){
			return subject.eachTeacher
		}
	},
	weekday: function(){
		if(this == 0){
			return 'Monday'
		}else if(this == 1){
			return 'Tuesday'
		}else if(this == 2){
			return 'Wednesday'
		}else if(this == 3){
			return 'Thursday'
		}else if(this == 4){
			return 'Friday'
		}
	},
	currentTeacher:function(){
		let data = Template.parentData(1);
		return data.id
	},
	group: function(){
		let subject = Courses.findOne(this._id);
		let temporary = Temporary.findOne();
		if(subject && temporary){
			return Groups.find({subject: subject._id, active: false}, {sort:{createdAt: -1}});
		}
	}
});

Template.CreateGroup.events({
	'submit #createGroup':function(event){
		event.preventDefault();
		let cHours = this.cHours;
		let cNumber = this.cNumber;
		let course = Temporary.findOne({subject: this._id});
		let group = Groups.findOne({subject: this._id, active: false});
		if(course && !group){
			course.eachTeacher.forEach(function (teacher) {
				teacher.days.forEach(function (day) {
					let address = teacher.id + day;
					let result = $('#'+address).is(":checked");
					if(result){
						let AllStudents = course.users;
						/////////////////////////////////////////////////////
						// FIND related to this day and teacher student
						//////////////////////////////////////////////////////
						let students = [];
						AllStudents.forEach(function(student){
							if(student.teacher == teacher.id && student.day == day){
								let userFullName = Profile.findOne({userId: student.user});
								let studentObj = {
									id: student.user,
									fullName: userFullName.surname + ' ' + userFullName.name + ' ' + userFullName.patronimyc
								}
								let studentEnrollsCount = Groups.find({"students.id": studentObj.id, active: false}).count();
								if(studentEnrollsCount < 5){
									students.push(studentObj);
								}
							}
						});
						let teacherObj = {
							id: teacher.id,
							fullName: teacher.fullName
						}
						let defaultLabelPart = moment(new Date()).format("MMM Do YY");
						let groupName = cNumber + ' ' + defaultLabelPart + ' ' + teacher.fullName + ' ' + day;
						/////////////////////////////////////////////////////////
						//Create group Object
						/////////////////////////////////////////////////////////
						let obj = {
							groupName: groupName,
							subject: course.subject,
							teacher: teacherObj,
							day: day,
							cHours: cHours,
							createdAt: new Date(),
							students: students,
							active: false
						}
						Groups.insert(obj);
					}
				});
			});
		}
	}
});