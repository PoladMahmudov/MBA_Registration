Template.SingleCourse.onCreated(function(){
	var self = this;
	Session.setDefault('UserBar', '');
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Temporary");
		self.subscribe("Profile");
	});
});

Template.SingleCourse.helpers({
	teacher: function(){
		let doc = Temporary.findOne({subject: this._id});
		if(doc){
			return doc.eachTeacher
		}
	},
	week:function(){
		let days = this.days;
		return days
	},
	weekday: function(){
		if(this == 0){
			return 'Monday'
		}else if(this == 1){
			return 'Tuesday'
		}else if(this == 2){
			return 'Wedneday'
		}else if(this == 3){
			return 'Thursday'
		}else if(this == 4){
			return 'Friday'
		}
	},
	student: function(){
		let eachTeacher = Template.parentData();
		let course = Template.parentData(2);
		let temporary = Temporary.findOne({subject:course._id});
		let day = this;
		let arrStudentsMentionedDay = temporary.users.filter(function(eachUser){
			if(eachUser.day == day && eachUser.teacher == eachTeacher.id){
				return true
			}
		});
		return arrStudentsMentionedDay;
	},
	name:function(){
		if(this.user){
			let user = Profile.findOne({userId: this.user});
			if (user) {
				return user.surname + ' ' + user.name + ' ' + user.patronimyc
			}
		}
	},
	showCourse:function(){
		return this._id == Session.get('showExactCourse');
	},
	selectedToGroup: function(){
		let user = this.user;
		let courseId = Template.parentData(3)._id;
		let temp = Temporary.findOne();
		if(courseId && temp){
			let exist = Groups.findOne({subject: courseId, active: false, "students.id":user});
			if(exist){
				return true
			}
		}
	}
});

Template.SingleCourse.events({
	'click .userName': function(event, template){
		let userId = this.user;
		Session.set('UserBar', userId);
	}
});