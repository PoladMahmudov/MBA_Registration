Template.ProfileForm.onCreated(function(){
	var self = this;
	self.autorun(()=>{
		self.subscribe("Profile");
	});
});

