Template.SettingsStudentSchedule.onCreated(function(){
	Session.setDefault('alert', false);
	Session.setDefault('exclusions', []);
});

Template.SettingsStudentSchedule.helpers({
	semester: function(){
		let time = Temporary.findOne({});
		if(time){
			return time.halfYear
		}
	},
	emptyTeacherField: function(){
		return Session.get('alert');
	},
	enrollToggle:function(){
		let enrollStatus = Settings.findOne({tag: 'enrollments'});
		if(enrollStatus){
			return enrollStatus.allow
		}else
			return false
	},
	enrollExist:()=>{
		let existance = Temporary.findOne();
		if (existance) {
			return true;
		}else
			return false
	},
	course:function(){
		let doc = Courses.find({disabled: false}, {sort:{cType: -1, cGroup: 1, cNumber: 1}}).fetch();
		let excludes = Session.get('exclusions');
		if (excludes && doc) {
			let updatedDoc = doc.filter(function(eachCourse){
				let detected = false;
				excludes.forEach(function (id) {
					if(eachCourse._id == id){
						detected = true
					}
				});
				return !detected;
			});
			if (updatedDoc) {
				return updatedDoc
			}
		}else if(doc){
			return doc
		}
	},
	excluded:function(){
		let exclusions = Session.get('exclusions');
		if (exclusions) {
			let arr = exclusions.map(function(id){
				return Courses.findOne({disabled: false, _id: id}, {fields:{cNumber:1}});
			});
			return arr
		}
	}

});

Template.SettingsStudentSchedule.events({
	'click .declare-sem':function(event){
		Meteor.call('newSemesterDeclaration', Session.get('exclusions'), function(err, resl){
			Session.set('alert', resl);
		});
		let enrollStatus = Settings.findOne({tag: 'enrollments'});
		if(enrollStatus){
			Settings.update(enrollStatus._id, {$set:{allow:true}});
		}
	},
	'click .remove-semester':function(){
		Meteor.call('removeSemester');
		let enrollStatus = Settings.findOne({tag: 'enrollments'});
		Settings.update(enrollStatus._id, {$set:{allow:false}});
	},
	'click .btn-stop':()=>{
		let enrollStatus = Settings.findOne({tag: 'enrollments'});
		Settings.update(enrollStatus._id, {$set:{allow:!enrollStatus.allow}});
	},
	'click #disableCourse':function(event){
		let exclude = event.target.value;
		let arr = Session.get('exclusions');
		arr.push(exclude);
		Session.set('exclusions', arr);
	},
	'click .remove-exclude':function(){
		let currentId = this._id;
		let arr = Session.get('exclusions');
		let updatedArr = arr.filter(function(id){
			if(currentId != id){
				return true
			}
		});
		Session.set('exclusions', updatedArr);
	}
});