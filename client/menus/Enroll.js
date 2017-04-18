Template.Enroll.onCreated(function(){
	Session.setDefault('selectedObj', null);
	Session.setDefault('openBar', false);
	this.editMode = new ReactiveVar(false);
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("Temporary");
		self.subscribe("Settings");
		self.subscribe("ProfileSingle", Meteor.userId());
		if (self.subscribe('ProfileSingle', Meteor.userId()).ready()) {
			let doc = Profile.findOne({userId: Meteor.userId()});
			if (!doc) {
				FlowRouter.go("registration-2");
			}
		}
		let userId = Meteor.userId();
		let enrolles = Temporary.find({"users.user":userId}).fetch();
		if(enrolles && userId){
			let userObj = enrolles.map(function (course) {
				let teacher;
				let day;
				course.users.forEach(function (user) {
					if (user.user = userId) {
						teacher = user.teacher;
						day = user.day;
					}
				});
				let obj = {
					teacher:teacher,
					subject: course.subject,
					day:day
				}
				return obj;
			});
			Session.set('selectedObj', userObj);
		}
	});
});

Template.Enroll.helpers({
	course:function(){
		let user = Profile.findOne({userId: Meteor.userId()});
		/*
			This piece of code comparing Prerequisites against user's completements
		*/
		if(user){
			let spec = user.specialisation;
			let allCourses = Temporary.find({$or:[{cType: 'required'}, {cSpecialisation: spec}]}).fetch();
			let accomplished = user.subjects;
			let enrollArr = allCourses.filter(function (course) {
				let prerequis = course.Prerequisites;
				let completed = true;
				let detected = false;
				if(prerequis){
					if(accomplished){
						prerequis.forEach(function (subjectPrereq) {
							let finded = false;
							accomplished.forEach(function (accompl) {
								if(subjectPrereq.id == accompl.id){
									if(accompl.score > 51){
										finded = true
									}
								}
							});
							if(completed){
								completed = finded;
							}
						});
					}else
						{completed = false;}
				}
				if(accomplished){
					accomplished.forEach(function (accompl) {
						if(course.subject == accompl.id){
							if(accompl.score > 51){
								detected = true;
							}
						}
					});
				}
				if(!detected && completed){
					return course;
				}
			});
			return enrollArr;
		}
		
	},
	Group:function(id){
		let doc = Courses.findOne({_id: id});
		if (doc) {
			return doc.cGroup;
		}
	},
	Number:function(id){
		let doc = Courses.findOne({_id: id});
		if (doc) {
			return doc.cNumber;
		}
	},
	Name:function(id){
		let doc = Courses.findOne({_id: id});
		if (doc) {
			return doc.cName;
		}
	},
	Hours:function(id){
		let doc = Courses.findOne({_id: id});
		if (doc) {
			return doc.cHours;
		}
	},
	day:function(){
		let arr = [
			{num: 0, thisArg: this},
			{num: 1, thisArg: this},
			{num: 2, thisArg: this},
			{num: 3, thisArg: this},
			{num: 4, thisArg: this},
		];
		return arr;
	},
	disabled:function(){
		let num = this.num;
		let days = this.thisArg.days;
		let disabled = true;
		let pickedDays = Session.get('selectedObj');
		days.forEach(function (day) {
			if(num == day){
				disabled = false
			}
		});
		if(pickedDays){
			pickedDays.forEach(function (picked) {
				if(num == picked.day){
					disabled = true
				}
			});
		}
		return disabled;
	},
	active:function(){
		let subject = Template.parentData(2).subject;
		let num = this.num;
		let teacher = this.thisArg.id;
		let pickedDays = Session.get('selectedObj');
		let active = false;
		if(pickedDays){
			pickedDays.forEach(function (selection) {
				if(subject == selection.subject && num == selection.day && teacher == selection.teacher){
					active = true;
				}
			});
		}
		return active;
	},
	subjectId: function(){
		return Template.parentData(2).subject;
	},
	enrollment:function(){
		return Session.get('selectedObj');
	},
	courseName:function(id){
		let course = Courses.findOne({_id: id});
		if (course) {
			return course.cNumber;
		}
	},
	weekDay:function(){
		let subject = this.subject;
		let pickedDays = Session.get('selectedObj');
		let arr = [];
		for (var i = 0; i < 5; i++) {
			let show = false;
			pickedDays.forEach(function (post) {
				if(post.subject == subject && post.day == i){
					show = true;
				}
			});
			arr.push({num: i, show: show});
		}
		return arr;
	},
	openBar:()=>{
		return Session.get('openBar')
	},
	enrollesCount:function(id){
		let amount = 0;
		let day = this.num;
		let teacher = this.thisArg.id;
		let doc = Temporary.findOne({subject: id});
		if (doc) {
			doc.users.forEach(function (user) {
				if(user.teacher == teacher && day == user.day){
					amount++;
				}
			});
		}
		return amount
	},
	editMode:function(){
		return Template.instance().editMode.get();
	},
	halfYear:function(){
		let doc = Temporary.findOne();
		if(doc){
			return doc.halfYear
		}
	},
	stoppedEnroll:function(){
		let enrollStatus = Settings.findOne({tag:'enrollments'});
		if(enrollStatus){
			return !enrollStatus.allow
		}
	}
});

Template.Enroll.events({
	'click .js-btn': function(event){
		let course = event.target.id;
		let obj = {
			teacher: this.thisArg.id,
			subject: course,
			day: this.num
		}
		let allSelects = Session.get('selectedObj');
		if(allSelects){
			let finded = false;
			let updatedSelections = allSelects.map(function (selection) {
				if(course == selection.subject && obj.day == selection.day && obj.teacher == selection.teacher){
					finded = true;
					return null
				}else{
					if(selection.subject == obj.subject){
						finded = true;
						return obj;
					}else{
						return selection;
					}	
				}
			});
			if(!finded){
				updatedSelections.push(obj);
			}
			let filtered = updatedSelections.filter(function(eachObj){
				if(eachObj == null){
					return false
				}else
					return true
			});
			Session.set('selectedObj', filtered);
		}else{
			Session.set('selectedObj', [obj]);
		}
	},
	'click .open-bar':function(){
		Session.set('openBar', !Session.get('openBar'));
	},
	'click .confirm-btn':function(event, template){
		if (Session.get('selectedObj').length >= 1) {
			Meteor.call('insertEnrollments', Session.get('selectedObj'), function(err, result){
				template.editMode.set(result);
			});
		}
	}
});