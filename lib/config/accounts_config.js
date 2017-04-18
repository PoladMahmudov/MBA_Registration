var myLogoutFunc = function(){
	FlowRouter.go('/');
	Session.set('nav-toggle', '');
}

AccountsTemplates.configure({
	confirmPassword: true,
	sendVerificationEmail: false, //*
	showForgotPasswordLink: false, //*
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,
    showForgotPasswordLink: true, //*
	texts: {
      inputIcons: {
          isValidating: "fa fa-spinner fa-spin",
          hasSuccess: "fa fa-check",
          hasError: "fa fa-times",
      },
      signUpLink_pre: "",
    },
    onLogoutHook: myLogoutFunc
});


AccountsTemplates.addField({
	_id: 'studentId',
	type: 'text',
	required: true,
	displayName: 'Student ID',
	placeholder: 'ID number',
	minLength: 4,
	maxLength: 15,
	func: function(value){
		var self = this;
		Meteor.call('studentIdCompare', value, function (error, result) {
			if (result){
                self.setSuccess();
            }else{
                self.setError('Invalid ID code');
            }
            self.setValidating(false);
		});
		return !Meteor.call('studentIdCompare', value);
	},
	showValidating:true,
	negativeValidation: true,
    positiveValidation: true,
    errStr: 'Invalid ID code'
});

