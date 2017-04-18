Template.StudentRow.onCreated(function(){
	this.editMode = new ReactiveVar(false);
	var self = this;
	self.autorun(()=>{
		self.subscribe("Groups");
		self.subscribe("Profile");
	});
});

Template.StudentRow.helpers({
	studentId: function(id){
		let profile = Profile.findOne({userId: id});
		if(profile){
			return profile.studentId
		}
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	scoreExist: function(){
		let studentId = this.id;
		let subject = Template.parentData().subject;
		let userScore = Profile.findOne({userId: studentId, "subjects.id": subject});
		if(userScore){
			let score;
			userScore.subjects.forEach(function (profileSubject) {
				if(profileSubject.id == subject){
					score = profileSubject.score;
				}
			});
			return score;
		}
	}
});


Template.StudentRow.events({
	'click .open-edit': function(event, template){
		template.editMode.set(!template.editMode.get());
	},
	'focusout #editScore':function(event, template){
		template.editMode.set(false);
	},
	'submit #confirmScore':function(event, template){
		event.preventDefault();
		let score = event.target.editScore.value;
		let student = this.id;
		let subject = Template.parentData().subject;
		let userScore = Profile.findOne({userId: student});
		if(score>=0 && score<=100){
			let obj = {
				id: subject,
				score: score,
				date: new Date()
			}
			if(!userScore.subjects && !Profile.findOne({userId: student, "subjects.id": subject})){
				Profile.update(userScore._id, {$push:{subjects: obj}})
			}else{
				Profile.update(userScore._id, {$pull:{subjects:{id: subject}}});
				Profile.update(userScore._id, {$push:{subjects: obj}})
			}
			template.editMode.set(false);
		}
	}
});