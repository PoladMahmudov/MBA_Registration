Template.Profile.onCreated(function(){
	var self = this;
	self.OpenUpdateForm = new ReactiveVar(false);
	self.editUserBirthday = new ReactiveVar(false);
	self.editUserMotherBirthday = new ReactiveVar(false);
	self.editUserFatherBirthday = new ReactiveVar(false);
	self.editUserSpecialisation = new ReactiveVar(false);
	self.editUserStatus = new ReactiveVar(false);
	self.autorun(()=>{
		let id = FlowRouter.getParam('id');
		self.subscribe('ProfileSingle', id);
		self.subscribe("Settings");
		if(Roles.userIsInRole(Meteor.userId(), 'admin')){
			self.subscribe('Courses');
		}
		if (self.subscribe('ProfileSingle', id).ready()) {
			let doc = Profile.findOne({userId: id});
			if (!doc) {
				FlowRouter.go("registration-2");
			}
		}
	});
});

Template.Profile.helpers({
	profile:function(){
		let id = FlowRouter.getParam('id');
		if(id){
			let doc = Profile.findOne({userId: id});
			if (doc) {
				return doc
			}
		}
	},
	dayOfBirth: function(date){
		let formated = moment(date).format('LL');
		return formated;
	},
	spec: function(specId){
		let spec = Settings.findOne(specId);
		if(spec){
			return spec.name;
		}
	},
	cLabel:function(id){
		let doc = Courses.findOne(id);
		if (doc) {
			return doc.cNumber + ' - ' + doc.cName
		}
	},
	course: function(){
		let userSubjects = this.subjects;
		let userSpecialisation = this.specialisation;
		let MainCourses = Courses.find({disabled: false, cType:'required'}, {sort:{cGroup: -1}}).fetch();
		let ElectiveCourses = Courses.find({disabled: false, cSpecialisation: userSpecialisation}).fetch();
		let unitedArr = MainCourses.concat(ElectiveCourses);
		if (userSubjects) {
			let filteredUnitedArr = unitedArr.filter(function(course){
				let notFinded = true;
				userSubjects.forEach(function (userSubject) {
					if(userSubjects.id == course._id){
						notFinded = false;
					}
				});
				return notFinded;
			});
			return filteredUnitedArr;
		}else
			return unitedArr;
	},
	OpenUpdateForm: function(){
		return Template.instance().OpenUpdateForm.get()
	},
	editAllowed: function(){
		let permited = this.admitted;
		if(Roles.userIsInRole(Meteor.userId(), 'admin') || !permited){
			return true
		}
	},
	specialList:function(){
		return Settings.find({tag: 'specialisation'});
	},
	editUserBirthday:function(){
		return Template.instance().editUserBirthday.get();
	},
	editUserMotherBirthday:function(){
		return Template.instance().editUserMotherBirthday.get();
	},
	editUserFatherBirthday:function(){
		return Template.instance().editUserFatherBirthday.get();
	},
	editUserSpecialisation:function(){
		return Template.instance().editUserSpecialisation.get();
	},
	editUserStatus:function(){
		return Template.instance().editUserStatus.get();
	}
});

Template.Profile.events({
	'click .delete-course':function(event, Template){
		let profileId = event.target.id;
		let subject  = this.id;
		if(profileId){
			Profile.update(profileId, {$pull:{subjects:{id: subject}}});
		}
	},
	'submit #addAccomplishment':function(event, template){
		event.preventDefault();
		let profileId = this._id;
		let score = event.target.score.value;
		let subjectId = $("#selectCourse").val();
		if(score && subjectId){
			let obj = {
				id: subjectId,
				score: score,
				date: new Date()
			}
			Profile.update(profileId, {$push:{subjects:obj}});
		}
	},
	'click .remove-user':function(){
		console.log(this)
		Meteor.call('RemoveUser', this._id, this.userId, this.groupUser);
	},
	'click .admit-user': function(){
		let admitted = this.admitted;
		Profile.update(this._id, {$set: {admitted: !admitted}});
	},
	'click .update-profile': function(event, template){
		template.OpenUpdateForm.set(!template.OpenUpdateForm.get());
	},
	'click .open-edit-birthday':function(event, template){
		template.editUserBirthday.set(!template.editUserBirthday.get());
	},
	'submit #edit-user-birthday':function(event, template){
		event.preventDefault();
		let permited = this.admitted;
		if(Roles.userIsInRole(Meteor.userId(), 'admin') || !permited){
			let birthday = event.target.birthday.value;
			if (birthday) {
				Profile.update(this._id, {$set:{birthday: birthday}});
			}
			template.editUserBirthday.set(false);
		}
	},
	'click .open-edit-mother-birthday':function(event, template){
		template.editUserMotherBirthday.set(!template.editUserMotherBirthday.get());
	},
	'submit #edit-user-mother-birthday':function(event, template){
		event.preventDefault();
		let permited = this.admitted;
		if(Roles.userIsInRole(Meteor.userId(), 'admin') || !permited){
			let birthday = event.target.birthday.value;
			if (birthday) {
				Profile.update(this._id, {$set:{"parents.mother.birthday": birthday}});
			}
			template.editUserMotherBirthday.set(false);
		}
	},
	'click .open-edit-father-birthday':function(event, template){
		template.editUserFatherBirthday.set(!template.editUserFatherBirthday.get());
	},
	'submit #edit-user-father-birthday':function(event, template){
		event.preventDefault();
		let permited = this.admitted;
		if(Roles.userIsInRole(Meteor.userId(), 'admin') || !permited){
			let birthday = event.target.birthday.value;
			if (birthday) {
				Profile.update(this._id, {$set:{"parents.father.birthday": birthday}});
			}
			template.editUserFatherBirthday.set(false);
		}
	},
	'click .open-edit-specialisation':function(event, template){
		template.editUserSpecialisation.set(!template.editUserSpecialisation.get());
	},
	'submit #edit-user-specialisation':function(event, template){
		event.preventDefault();
		let permited = this.admitted;
		if(Roles.userIsInRole(Meteor.userId(), 'admin') || !permited){
			let special = $("#selectSpecialisation").val();
			if (special) {
				Profile.update(this._id, {$set:{specialisation: special}});
			}
			template.editUserSpecialisation.set(false);
		}
	},
	'click .open-edit-status':function(event, template){
		template.editUserStatus.set(!template.editUserStatus.get());
	},
	'submit #edit-user-status':function(event, template){
		event.preventDefault();
		let permited = this.admitted;
		if(Roles.userIsInRole(Meteor.userId(), 'admin') || !permited){
			let status = $("#selectStatus").val();
			if (status) {
				Profile.update(this._id, {$set:{socialStatus: status}});
			}
			template.editUserStatus.set(false);
		}
	}
});


//var id = FlowRouter.getParam('id');