MBAregistration = new SimpleSchema({
	userId:{
		type: String,
		defaultValue: function(){
			return Meteor.userId();
		},
		autoform:{
			type: "hidden"
		}
	},
	groupUser:{
		type: String,
		defaultValue: 'student',
		autoform:{
			type: "hidden"
		}
	},
	studentId:{
		type: String,
		autoform:{
			type: "hidden",
			value:function(){
				let id = Meteor.user().profile.studentId;
				if(id){
					return id;
				}
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
	admitted:{
		type: Boolean,
		defaultValue: 'false',
		autoform:{
			type: "hidden",
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
	specialisation:{
		type: String,
		label: 'Select your specialisation',
		autoform:{
			options: function(){
				let spec = Settings.find({tag: 'specialisation'}, {fields:{_id:1, name:1}}).fetch();
				let specsToOption = spec.map(function (currentValue) {
					let value = {
						label: currentValue.name,
						value: currentValue._id
					};
					return value;
				});
				return specsToOption;
			}
		}
	},
	scoredPoints:{
		type: Number,
		label: 'Scored points for admission',
		min: 0,
		max: 999
	},
	passportData:{
		type: Object,
		optional: false
	},
	"passportData.serial":{
		type: String,
		label: 'Passport Serial',
		optional: false,
		min:2,
		max:3
	},
	"passportData.number":{
		type: Number,
		label: 'Passport Number',
		optional: false,
		min: 0,
		max: 999999999999999,
		decimal: true
	},
	contacts:{
		type: Object
	},
	"contacts.address":{
		type: String,
		label: 'Address',
		min: 1,
		max: 60
	},
	"contacts.phoneMob":{
		type: Number,
		label: 'Phone (mobile)',
		autoform: {
		    afFieldInput: {
		      type: "tel"
		    }
		}
	},
	"contacts.phoneTel":{
		type: Number,
		label: 'Phone (home)',
		optional: true,
		autoform: {
		    afFieldInput: {
		      type: "tel"
		    }
		}
	},
	parents:{
		type: Object,
		optional: false
	},
	"parents.mother":{
		type: Object,
		optional: false
	},
	"parents.father":{
		type: Object,
		optional: false
	},
	"parents.mother.fullName":{
		type: String,
		label: 'Mother\'s full name',
		min: 3,
		max: 30
	},
	"parents.mother.birthday":{
		type: Date,
		label: 'Birthday',
		autoform:{
			placeholder:'YYYY-MM-DD'
		}
	},
	"parents.mother.workPlace":{
		type: String,
		label: 'Place of work',
		optional: true,
		defaultValue: 'None',
		min: 1,
		max: 30
	},
	"parents.mother.contacts":{
		type: String,
		label: 'Phone or Email',
		optional: true,
		defaultValue: 'None',
		min: 3,
		max: 30
	},
	"parents.father.fullName":{
		type: String,
		label: 'Father\'s full name',
		min: 3,
		max: 30
	},
	"parents.father.birthday":{
		type: Date,
		label: 'Birthday',
		autoform:{
			placeholder:'YYYY-MM-DD'
		}
	},
	"parents.father.workPlace":{
		type: String,
		label: 'Place of work',
		optional: true,
		defaultValue: 'None',
		min: 1,
		max: 30
	},
	"parents.father.contacts":{
		type: String,
		label: 'Phone or Email',
		optional: true,
		defaultValue: 'None',
		min: 3,
		max: 30
	},
	graduated:{
		type: [Object],
		maxCount: 4,
		minCount: 1
	},
	"graduated.$.university":{
		type: String,
		label: 'Graduated University',
		min: 3,
		max: 50
	},
	"graduated.$.specialisation":{
		type: String,
		label: 'Specialisation',
		min: 3,
		max: 50
	},
	"graduated.$.diplomaId":{
		type: String,
		label: 'Diploma ID',
		min: 3,
		max: 20
	},
	workPlace:{
		type: String,
		label: 'Place of work',
		defaultValue: 'None',
		optional: true,
		min: 1,
		max: 30
	},
	socialStatus:{
		type: String,
		label: 'Social status',
		defaultValue: 'None',
		allowedValues: ['None', 'Refugee', 'The family of disabled']
	},
	subjects:{
		type: Array,
		optional: true,
		autoform:{
			type: 'hidden'
		}
	},
	"subjects.$":{
		type: Object
	},
	"subjects.$.id":{
		type: String
	},
	"subjects.$.score":{
		type: Number
	},
	"subjects.$.date":{
		type: String,
		defaultValue: new Date(),
		autoform:{
			type: 'hidden'
		}
	}
});


//Profile.attachSchema(MBAregistration);

