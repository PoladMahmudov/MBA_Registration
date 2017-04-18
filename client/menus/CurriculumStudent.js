Template.CurriculumStudent.onCreated(function(){
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe('ProfileSingle', Meteor.userId());
		self.subscribe("Settings");
		if (self.subscribe('ProfileSingle', Meteor.userId()).ready()) {
			let doc = Profile.findOne({userId: Meteor.userId()});
			if (!doc) {
				FlowRouter.go("registration-2");
			}
		}
	});
});

Template.CurriculumStudent.helpers({
	docs: function(doc){
		return Courses.findOne({_id: doc}).cNumber
	},
	cornerstone: function(){
		return Courses.find({cGroup: 'cornerstone', disabled: false}).fetch();
	},
	functional: ()=> {
		return Courses.find({cGroup: 'functional', disabled: false}).fetch();
	},
	elective: function(){
		let user = Profile.findOne({userId:Meteor.userId()});
		if(user){
			return Courses.find({cSpecialisation: user.specialisation, disabled: false}).fetch();
		}
	},
	score: function(){
		let id = this._id;
		let user = Profile.findOne({userId: Meteor.userId()});
		if(user){
			if (user.subjects) {
				let score = '--';
				user.subjects.forEach(function(val){
					if(val.id == id){
						score = val.score
					}
				});
				return score
			}else{
				return '--'
			}
		}
	},
	special:function(){
		let user = Profile.findOne({userId: Meteor.userId()});
		if(user){
			let name = Settings.findOne({_id: user.specialisation});
			if(name){
				return name.name;
			}
		}
		else{
			return 'Undefined Specialisation'
		}
	},
	docs: function(doc){
		return Courses.findOne({_id: doc}).cNumber
	}
});

Template.CurriculumStudent.events({
	
});