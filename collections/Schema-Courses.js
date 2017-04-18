// Cornerstone Core

Cornerstone = new SimpleSchema({
	cGroup:{
		type: String,
		defaultValue: 'cornerstone',
		autoform:{
			type: 'hidden'
		}
	},
	disabled:{
		type: Boolean,
		defaultValue: 'false',
		autoform:{
			type: 'hidden'
		}
	},
	cType:{
		type: String,
		defaultValue: 'required',
		autoform:{
			type: 'hidden'
		}
	},
	cNumber:{
		type: String,
		label: 'Course Number',
		min: 3,
		autoform:{
			placeholder: 'MBA****'
		}
	},
	cName:{
		type: String,
		label: 'Course Label',
		min: 3,
	},
	cHours:{
		type: Number,
		label: 'Course Hours',
		defaultValue: 3,
		decimal: true,
		allowedValues: [3, 1.5],
		autoform: {
         	step: "1.5"
      	}
	},
	teachers:{
		type: [Object],
		optional: true,
		label: 'Select teacher & date(s)'
	},
	"teachers.$.id":{
		type: String,
		label: 'Teacher',
		autoform:{
			options: function (){
				let arr = Profile.find({groupUser: 'teacher'}, {sort:{surname:1, name:1, patronimyc:1}}).map(function(value){
					let newVal = {
						value: value._id,
						label: value.surname + ' ' + value.name + ' ' + value.patronimyc
					}
					return newVal
				});
				return arr
			}
		}
	},
	"teachers.$.days": {
      type: Array,
      minCount: 1,
      maxCount: 5,
      label: "Select days (Press 'Ctrl' for multiple choise)",
      defaultValue:[0,1,2,3,4],
      autoform: {
      	class: 'select-day',
         options: [
            {
               label: "Mon",
               value: 0
            },
            {
               label: "Tue",
               value: 1
            },
            {
               label: "Wed",
               value: 2
            },
            {
               label: "Thu",
               value: 3
            },
            {
               label: "Fri",
               value: 4
            }
         ]
      }
	},
	"teachers.$.days.$": {
      type: String,
      label: "Select days (Press 'Ctrl' for multiple choise)",
      optional: true
	}
});




// Functional Core

Functional = new SimpleSchema({
	cGroup:{
		type: String,
		defaultValue: 'functional',
		autoform:{
			type: 'hidden'
		}
	},
	disabled:{
		type: Boolean,
		defaultValue: 'false',
		autoform:{
			type: 'hidden'
		}
	},
	cType:{
		type: String,
		defaultValue: 'required',
		autoform:{
			type: 'hidden'
		}
	},
	cNumber:{
		type: String,
		label: 'Course Number',
		min: 3,
		max: 10,
		autoform:{
			placeholder: 'MBA****'
		}
	},
	cName:{
		type: String,
		label: 'Course Label',
		min: 3,
		max: 50
	},
	cHours:{
		type: Number,
		label: 'Course Hours',
		defaultValue: 3,
		decimal: true,
		allowedValues: [3, 1.5],
		autoform: {
         	step: "1.5"
      	}
	},
	Prerequisites:{
		type: [Object],
		optional: true,
	},
	"Prerequisites.$.id":{
		type: String,
		label: 'Select cours number',
		defaultValue: 'none', ///////////// CHECK IT OUT !!!
		autoform:{
			options: function(){
				let course = Courses.find({cType: 'required', disabled: false}, {fields:{_id:1, cNumber:1}}).fetch();
				let coursesToOption = course.map(function (currentValue) {
					let value = {
						label: currentValue.cNumber,
						value: currentValue._id
					};
					return value;
				});
				return coursesToOption;
			}
		}
	},
	teachers:{
		type: [Object],
		optional: true,
		label: 'Select teacher & date(s)'
	},
	"teachers.$.id":{
		type: String,
		label: 'Teacher',
		autoform:{
			options: function (){
				let arr = Profile.find({groupUser: 'teacher'}, {sort:{surname:1, name:1, patronimyc:1}}).map(function(value){
					let newVal = {
						value: value._id,
						label: value.surname + ' ' + value.name + ' ' + value.patronimyc
					}
					return newVal
				});
				return arr
			}
		}
	},
	"teachers.$.days": {
      type: Array,
      minCount: 1,
      maxCount: 5,
      label: "Select days (Press 'Ctrl' for multiple choise)",
      defaultValue:[0,1,2,3,4],
      autoform: {
      	class: 'select-day',
         options: [
            {
               label: "Mon",
               value: 0
            },
            {
               label: "Tue",
               value: 1
            },
            {
               label: "Wed",
               value: 2
            },
            {
               label: "Thu",
               value: 3
            },
            {
               label: "Fri",
               value: 4
            }
         ]
      }
	},
	"teachers.$.days.$": {
      type: String,
      label: "Select days (Press 'Ctrl' for multiple choise)",
      optional: true
	}
});


// Electives

Electives = new SimpleSchema({
	cGroup:{
		type: String,
		defaultValue: 'capstone',
		autoform:{
			type: 'hidden'
		}
	},
	disabled:{
		type: Boolean,
		defaultValue: 'false',
		autoform:{
			type: 'hidden'
		}
	},
	cType:{
		type: String,
		defaultValue: 'elective',
		autoform:{
			type: 'hidden'
		}
	},
	cSpecialisation:{
		type: String,
		label: 'Elective group',
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
	cNumber:{
		type: String,
		label: 'Course Number',
		min: 3,
		max: 10
	},
	cName:{
		type: String,
		label: 'Course Label',
		min: 3,
		max: 50
	},
	cHours:{
		type: Number,
		label: 'Course Hours',
		decimal: true,
		defaultValue: 3,
		allowedValues: [3, 1.5],
		autoform: {
         	step: "1.5"
      	}
	},
	Prerequisites:{
		type: [Object],
		optional: true,
	},
	"Prerequisites.$.id":{
		type: String,
		label: 'Select cours number',
		autoform:{
			options: function(){
				let course = Courses.find({disabled: false}, {fields:{_id:1, cNumber:1}}).fetch();
				let coursesToOption = course.map(function (currentValue) {
					let value = {
						label: currentValue.cNumber,
						value: currentValue._id
					};
					return value;
				});
				return coursesToOption;
			}
		}
	},
	teachers:{
		type: [Object],
		optional: true,
		label: 'Select teacher & date(s)'
	},
	"teachers.$.id":{
		type: String,
		label: 'Teacher',
		autoform:{
			options: function (){
				let arr = Profile.find({groupUser: 'teacher'}, {sort:{surname:1, name:1, patronimyc:1}}).map(function(value){
					let newVal = {
						value: value._id,
						label: value.surname + ' ' + value.name + ' ' + value.patronimyc
					}
					return newVal
				});
				return arr
			}
		}
	},
	"teachers.$.days": {
      type: Array,
      minCount: 1,
      maxCount: 5,
      label: "Select days (Press 'Ctrl' for multiple choise)",
      defaultValue:[0,1,2,3,4],
      autoform: {
      	class: 'select-day',
         options: [
            {
               label: "Mon",
               value: 0
            },
            {
               label: "Tue",
               value: 1
            },
            {
               label: "Wed",
               value: 2
            },
            {
               label: "Thu",
               value: 3
            },
            {
               label: "Fri",
               value: 4
            }
         ]
      }
	},
	"teachers.$.days.$": {
      type: String,
      label: "Select days (Press 'Ctrl' for multiple choise)",
      optional: true
	}
});