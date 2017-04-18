Template.DisabledTable.onCreated(function(){
	this.Opendisabled = new ReactiveVar(false);
	var self = this;
	self.autorun(()=>{
		self.subscribe("Courses");
	});
});

Template.DisabledTable.helpers({
	subject: ()=> {
		return Courses.find({disabled: true}).fetch();
	},
	docs: function(doc){
		return Courses.findOne({_id: doc}).cNumber
	},
	Opendisabled: function(){
		return Template.instance().Opendisabled.get();
	}
});

Template.DisabledTable.events({
	'click .reestablish': function() {
		Courses.update({_id:this._id}, {$set:{disabled: false}});
	},
	'click .erase': function() {
		let id = this._id;
		Courses.remove(id);
	},
	'click h2': function(event, template) {
		template.Opendisabled.set(!template.Opendisabled.get());
	}
})