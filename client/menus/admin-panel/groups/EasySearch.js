Template.EasySearch.onCreated(function(){
	this.showDropdown = new ReactiveVar(false);
	this.mouseenter = new ReactiveVar(false);
});

Template.EasySearch.helpers({
  profilesIndex: () => {
  	return ProfilesIndex
  },
  inputAttributes:()=>{
  	return {
      placeholder: 'Add a student'
    };
  },
  studentExist: function(){
  	let user = this.userId;
  	let group = Template.parentData(2);
  	let temp = Temporary.findOne();
  	let hided = false;
    let userEnrollCount = Groups.find({active: false, "students.id":user}).count();
  	if(Groups.findOne({subject: group.subject, active: false, "students.id":user}) || userEnrollCount>=5){
  		hided = true;
  	}else{
	  	group.students.forEach(function (student) {
	  		if (student.id == user) {
	  			hided = true
	  		}
	  	});
  	}
  	return hided
  },
  showDropdown: function(){
  	return Template.instance().showDropdown.get();
  }
});

Template.EasySearch.events({
  'click .js-pickStudent': function(event, template){
  	let group = template.data;
  	let userId = this.userId;
  	let user = this;
  	let temp = Temporary.findOne();
    let finded = Groups.findOne({subject: group.subject, active: false, "students.id":userId});
    let findedCount = Groups.find({active: false, "students.id":userId}).count();
  	if(!finded && findedCount<5){
  		let obj = {
  			id: userId,
  			fullName: user.surname + ' ' + user.name + ' ' + user.patronimyc
  		}
  		Groups.update(group._id, {$push:{students:obj}});
  	}
  },
  'focusin input':function(event, template){
  	template.showDropdown.set(true);
  },
  'focusout input':function(event, template){
  	if(!template.mouseenter.get()){
	  	template.showDropdown.set(false);
	  }
  },
  'mousedown .namesDropdown':function(event, template){
  	template.mouseenter.set(true);
  },
  'mouseup .namesDropdown':function(event, template){
  	template.mouseenter.set(false);
  	template.showDropdown.set(false);
  }
});