Template.Curriculum.onCreated(function(){
	Session.setDefault('showAddEllectiveForm', false);
	Session.setDefault('showAddCornerstoneForm', false);
	Session.setDefault('showAddFunctionalForm', false);
	Session.setDefault('showAddElectiveSubjectForm', false);
	this.OpenMain = new ReactiveVar(false);
	this.OpenElective = new ReactiveVar(false);
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
		self.subscribe("TeachersProfile");
		self.subscribe("Settings");
	});
});

Template.Curriculum.helpers({
	specialisation: ()=> {
		let doc = Settings.find({tag: 'specialisation'},{sort:{createdAt:-1}});
		return doc;
	},
	cornerCourse: ()=> {
		return Courses.find({cGroup: 'cornerstone', disabled: false}).fetch();
	},
	functionCourse: ()=> {
		return Courses.find({cGroup: 'functional', disabled: false}).fetch();
	},
	electiveCourse: function(doc){
		return Courses.find({cSpecialisation: doc._id, disabled: false}).fetch();
	},
	OpenMain: function(){
		return Template.instance().OpenMain.get();
	},
	OpenElective: function(){
		return Template.instance().OpenElective.get();
	}
});

Template.Curriculum.events({
	'click .elective': ()=> {
		Session.set('showAddEllectiveForm', !Session.get('showAddEllectiveForm'));
		Session.set('showAddElectiveSubjectForm', false);
	},
	'click .js-corner': ()=> {
		Session.set('showAddCornerstoneForm', !Session.get('showAddCornerstoneForm'));
	},
	'click .js-func': ()=> {
		Session.set('showAddFunctionalForm', !Session.get('showAddFunctionalForm'));
	},
	'click .js-elective': ()=> {
		Session.set('showAddElectiveSubjectForm', !Session.get('showAddElectiveSubjectForm'));
		Session.set('showAddEllectiveForm', false);
	},
	'click .remove-specialisation': function(){
		Meteor.call('removeSpecialisation', this._id);
	},
	'click h2.open-main': function(event, template) {
		template.OpenMain.set(!template.OpenMain.get());
	},
	'click h2.open-elective': function(event, template) {
		template.OpenElective.set(!template.OpenElective.get());
	}
})