Template.CornerstoneTable.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});

Template.CornerstoneTable.helpers({
	editMode:function(){
		return Template.instance().editMode.get();
	},
	name: function(id){
		let fullname = Profile.findOne({_id: id}, {fields:{name:1, surname:1, patronimyc:1}});
		return (fullname.surname + ' ' + fullname.name + ' ' + fullname.patronimyc)
	},
	week: function(days){
		let weekDays = days.map(function(value){
			let newVal;
			if(value == 0){
				newVal = 'Mon';
			}else if(value == 1){
				newVal = 'Tue';
			}else if(value == 2){
				newVal = 'Wed';
			}else if(value == 3){
				newVal = 'Thu';
			}else if(value == 4){
				newVal = 'Fri';
			}
			return newVal
		});
		weekDays.toString();
		return weekDays;
	}
});

Template.CornerstoneTable.events({
	'click .edit':function(event, template){
		template.editMode.set(!template.editMode.get());
	},
	'click .delete':function(event, template){
		Courses.update({_id:this._id}, {$set:{disabled: true, teachers: null}});
		let id = this._id;
		let arr = Courses.find({Prerequisites:{$in:[{id:id}]}}, {fields:{Prerequisites:1}}).fetch();
		arr.forEach(function (post) {
			let newArr = post.Prerequisites.filter(function(element){
				if(element.id == id){
					return false
				}
				return true
			});
			Courses.update({_id: post._id}, {$set:{Prerequisites: newArr}});
		});
	}
});