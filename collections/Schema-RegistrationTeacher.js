RegistrationTeacher = new SimpleSchema({
	groupUser:{
		type: String,
		defaultValue: 'teacher',
		autoform:{
			type: "hidden"
		}
	},
	userId:{
		type: String,
		defaultValue: function(){
			return Meteor.userId();
		},
		autoform:{
			type: "hidden"
		}
	},
	teacherId:{
		type: String,
		autoform:{
			type: "hidden",
			value: function(){
				return Meteor.user().profile.studentId;
			}
		}
	},
	createdAt:{
		type: String,
		autoform:{
			type: "hidden",
			value: function(){
				return new Date();
			}
		}
	},
	name:{
		type: String,
		label: 'Name',
		max: 15,
		min: 3
	},
	surname:{
		type: String,
		label: 'Surname',
		max: 15,
		min: 3
	},
	patronimyc:{
		type: String,
		label: 'Patronimyc',
		max: 15,
		min: 3
	},
	birthday:{
		type: Date,
		label: 'Birthday',
		optional: false,
		autoform:{
			placeholder:'YYYY-MM-DD'
		}
	},
	contacts:{
		type: Object
	},
	"contacts.phoneMob":{
		type: Number,
		label: 'Phone',
		autoform: {
		    afFieldInput: {
		      type: "tel"
		    }
		}
	},
	"contacts.Email":{
		type: String,
		label: 'Email (for students)',
		optional:true,
		regEx: SimpleSchema.RegEx.Email,
		autoform: {
		    afFieldInput: {
		      type: "email"
		    }
		}
	},
	about:{
		type: String,
		label: 'About',
		optional: true,
		autoform:{
			afFieldInput: {
				type: "textarea"
			}
		}
	}
});

//Teachers.attachSchema(RegistrationTeacher);