Template.SingleGroup.onCreated(function(){
	let self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Groups");
		self.subscribe("Temporary");
		self.subscribe("Profile");
	});
});

Template.SingleGroup.helpers({
	courseInfo: function(subjectId){
		let subject = Courses.findOne(subjectId);
		if (subject) {
			return subject.cNumber + ' - ' + subject.cName
		}
	},
	weekDay: function(day){
		if(day == 0){
			return 'Monday'
		}else if(day == 1){
			return 'Tuesday'
		}else if(day == 2){
			return 'Wednesday'
		}else if(day == 3){
			return 'Thursday'
		}else if(day == 4){
			return 'Friday'
		}
	},
	users: function(){
		return Profile.find({groupUser: 'student'});
	},
	EnrollStopped: function(){
		let set = Settings.findOne({tag: "enrollments"});
		if(set){
			return !set.allow
		}
	}
});

Template.SingleGroup.events({
	'click .remove-group': function(event){
		Groups.remove(this._id);
	},
	'click .remove-student': function(event, template){
		let group = template.data._id;
		let user = this.id;
		Groups.update(group, {$pull:{students:{id: user}}});
	},
	'submit #userInput':function(event){
		event.preventDefault();
		console.log(event.target.student.id)
	},
	'click .js-showStudent': function(){
		Session.set('UserBar', this.id);
	},
	'click .active-group': function(){
		let group = this._id;
		Groups.update(group, {$set:{active:true}});
	}
});