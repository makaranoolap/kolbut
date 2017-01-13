Template.login.events({
    'click #btn-login': function(event,tpl){
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
		/*$('.close').click();*/
		Meteor.loginWithPassword(email, password, function(error){
		 	if(!error){
		 		var loggedInUser = Meteor.user();
				var group = 'mygroup';
				if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/homeadmin');
					
				}
				else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	
						Router.go('/homeadmin');
				} 
				Bert.alert( 'Login Successfull', 'success', 'growl-top-right' );
		 	}	

		});
    }
});
Template.header.events({
	'click #logout':function(e){
		e.preventDefault();
		Meteor.logout();
	}
})
