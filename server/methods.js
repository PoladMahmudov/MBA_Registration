Meteor.methods({
	studentIdCompare: function(value){
		let ids = Settings.find({tag:'studentId', activated: false}, {fields:{studentId:1}}).fetch();
		let i = 0;
		let valid = ids.map(function(currentValue){
			if(currentValue.studentId == value){
				i++
			}
		});
		return !!i;
	},
	idInsert: function(docId){
		let userId = this.userId;
		Meteor.users.update(userId, {
			$set: {profileId: docId}
		});
	},
	SettingsList: function(doc){
		if (Roles.userIsInRole(this.userId, 'admin')) {
			Settings.insert(doc);
		}
	},
	CourseList: function(doc){
		if (Roles.userIsInRole(this.userId, 'admin')) {
			Courses.insert(doc);
		}
	},
	insertProfile:function(doc){
		let user = this.userId;
		if(Roles.userIsInRole(this.userId, doc.groupUser)){
			if(user){
				if(!Profile.findOne({userId: user})){
					Profile.insert(doc);
				}
			}
		}
	},
	ForbidReg: function(checked){
		if (Roles.userIsInRole(this.userId, 'admin')){
			if(checked){
				Settings.update({tag:'studentId', activated: 'delay'}, {$set:{activated: false}}, {multi: true});
				return true;	
			}
			else{
				Settings.update({tag:'studentId', activated: false}, {$set:{activated: 'delay'}}, {multi: true});
				return false;
			}
		}
	},
	studentIdFind: function(){
		return !!Settings.findOne({tag:'studentId', activated: false});
	},
	removeSpecialisation: function(id){
		if(Roles.userIsInRole(this.userId, 'admin')){
			Courses.remove({cSpecialisation: id});
			Settings.remove(id);	
		}
	},
	newSemesterDeclaration: function(exclusions){
		if(Roles.userIsInRole(this.userId, 'admin')){
			let availableCourses = Courses.find({disabled: false}).fetch();
			//////////////////////////////////////////////////////////
			// filtering given exclussions from all courses
			//////////////////////////////////////////////////////////////
			let allowedCourses = availableCourses.filter(function(course){
				let findedExclussion = false;
				if (exclusions) {
					exclusions.forEach(function (id) {
						if(course._id == id){
							findedExclussion = true;
						}
					});
				}
				return !findedExclussion
			});
			///////////////////////////////////////////////////
			// finding courses with unestablished teachers field
			////////////////////////////////////////////////////
			let emptyTeacherField = [];
			emptyTeacherField = allowedCourses.filter(function(course){
				if(course.teachers == null){
					return true
				}
				return false
			});
			//if emptyTeacherField has something give an error
			if(emptyTeacherField.length == 0){
				if(Temporary.findOne()){
					Temporary.remove({});
				}
				allowedCourses.forEach(function(subject){
					let teachers = subject.teachers.map(function (post) {
						if(post){
							let teacher = Profile.findOne({_id: post.id}, {fields:{name:1, surname:1, patronimyc:1}});
							return ({
								id: post.id,
								fullName: teacher.surname + ' ' + teacher.name + ' ' + teacher.patronimyc,
								days: post.days
							});
						}
					});

					let time = new Date();
					let year = moment(time).format('YYYY');
					let month = moment(time).format('MM');
					let sem = '';
					if(month >= 11 || month<=03){
						sem = 'Spring';
						if(month>10){
							year++;
						}
					}else{
						sem = 'Fall'
					}
					let Prerequisites = null;
					if(subject.Prerequisites){
						Prerequisites = subject.Prerequisites;
					}
					let obj = {
						subject: subject._id,
						cType: subject.cType,
						halfYear: sem + '-' + year,
						Prerequisites: Prerequisites,
						eachTeacher: teachers,
						users:[]
					};
					if(subject.cSpecialisation){
						obj = {
							subject: subject._id,
							cType: subject.cType,
							cSpecialisation: subject.cSpecialisation,
							halfYear: sem + '-' + year,
							Prerequisites: Prerequisites,
							eachTeacher: teachers,
							users:[]
						}
					}
					Temporary.insert(obj);
				});
				return false;
			}
			else {
				return emptyTeacherField;
			}
		}
	},
	removeSemester: function(){
		if(Roles.userIsInRole(this.userId, 'admin')){
			Temporary.remove({});
		}
	},
	insertEnrollments: function(userObj){
		let enrollStatus = Settings.findOne({tag: 'enrollments'});
		let enroll = false;
		if (enrollStatus) {
			enroll = enrollStatus.allow;
		}
		let user = this.userId;
		let callBack = false;
		if(user && userObj.length > 0 && userObj.length <= 5 && enroll){
			Temporary.update({"users.user":user}, {$pull:{users:{user:user}}}, {multi:true});
			userObj.forEach(function (selected) {
				let teacher = selected.teacher;
				let subject = selected.subject;
				let day = selected.day;
				let obj = {
					user: user,
					teacher: teacher,
					day: day
				}
				/*
					This piece of code comparing Prerequisites against user's completements
				*/
				let userSpec = Profile.findOne({userId: user}).specialisation;
				let finished = Profile.findOne({userId: user}).subjects;
				let currentSubjectPrerequisites = Courses.findOne({_id:subject}).Prerequisites;
				let completed = true;
				if(currentSubjectPrerequisites){
					currentSubjectPrerequisites.forEach(function (mandatoryPre) {
						let finded = false;
						finished.forEach(function (endedPre) {
							if(endedPre){
								if(mandatoryPre.id == endedPre.id){
									if(endedPre.score > 51){
										finded = true;
									}
								}
							}
						});
						if (completed) {
							completed = finded;
						}
					});
				}
				if (completed) {
					Temporary.update({subject:subject}, {$push:{users:obj}});
					callBack = true;
				}
			});
		}
		return callBack;
	},
	RemoveUser:function(profileId, userId, groupUser){
		if (Roles.userIsInRole(this.userId, 'admin') && profileId && userId && groupUser) {
			if (groupUser === 'student') {
				Profile.remove(profileId);
				Meteor.users.remove(userId);
				Groups.update({"students.id": userId}, {$pull:{students:{id: userId}}}, {multi: true});
				Temporary.update({"users.user": userId}, {$pull:{users:{user: userId}}}, {multi: true});
			}
			if (groupUser === 'teacher') {
				Profile.remove(profileId);
				Meteor.users.remove(userId);
				Temporary.update({"eachTeacher.id": profileId}, {$pull:{eachTeacher:{id: profileId}}}, {multi: true});
				Courses.update({"teachers.id": profileId}, {$pull:{teachers:{id:profileId}}}, {multi: true});
			}
		}
	}
});