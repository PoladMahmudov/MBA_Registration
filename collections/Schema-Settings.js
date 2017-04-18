NewSpecialisation = new SimpleSchema({
	name:{
		type: String,
		label: 'ADD Specialisation',
		max: 50,
		min: 1
	},
	tag:{
		type: String,
		defaultValue: 'specialisation',
		autoform:{
			type: "hidden"
		}
	}
});

NewStudentId = new SimpleSchema({
	studentId:{
		type: String,
		label: 'Add new ID for registration',
		max: 20,
		min: 1
	},
	idFor:{
		type: String,
		label: 'Select ID\'s owner (student or teacher)',
		defaultValue: 'student',
		allowedValues:['student', 'teacher']
	},
	activated:{
		type: Boolean,
		defaultValue: 'false',
		autoform:{
			type: "hidden"
		}
	},
	createdAt:{
		type: Date,
		defaultValue:function(){
			return new Date()
		},
		autoform:{
			type: "hidden"
		}
	},
	tag:{
		type: String,
		defaultValue: 'studentId',
		autoform:{
			type: "hidden"
		}
	}
});


/*Settings.attachSchema(NewSpecialisation, {selector: {tag: 'specialisation'}});
Settings.attachSchema(NewStudentId, {selector: {tag: 'studentId'}});
*/