Template.SettingsStudentId.onCreated(function(){
	Session.setDefault('showAddIdForm', false);
	var self = this;
	self.autorun(()=>{
		self.subscribe("Settings");
	});
});

Template.SettingsStudentId.helpers({
	registrationId: ()=> {
		let doc = Settings.find({tag:'studentId'},{sort:{createdAt:-1}});
		return doc;
	},
	createdOn:function(){
		return moment(this.createdAt).format("MMM Do YY");
	}
});

Template.SettingsStudentId.events({
	'click .js-addIdForm': ()=> {
		Session.set('showAddIdForm', !Session.get('showAddIdForm'));
	},
	'click .js-delete-id': function(event){
		Settings.remove({_id:this._id});
	}
})