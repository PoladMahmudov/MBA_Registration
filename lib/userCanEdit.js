EditableText.userCanEdit = function(doc,Collection) {
  if (Collection._name == "profile") {
  	if (doc.admitted !== true && doc.userId == Meteor.userId() || Roles.userIsInRole(Meteor.userId(), 'admin')) {
  		return true
  	}else
  		return false
  }
  if (Collection._name == "settings") {
  	if(Roles.userIsInRole(Meteor.userId(), 'admin')){
  		return true
  	}else
  		return false
  }
  if (Collection._name == "groups") {
  	if(Roles.userIsInRole(Meteor.userId(), 'admin')){
  		return true
  	}else
  		return false
  }
}