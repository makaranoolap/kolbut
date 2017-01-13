// register 
Template.register.events({
    'submit #register': function(e, tpl){
		e.preventDefault();
		//alert("register"); 
		//var birth = e.target.birth.value;
		var sex = e.target.sex.value;
		var username =e.target.username.value;
		var firstname =e.target.firstname.value;
		var lastname = e.target.lastname.value;
		var email =e.target.email.value;
		var password =e.target.password.value;
		var rerole = e.target.role.value;
		var profile={
			username:username,
			firstname:firstname,
			lastname:lastname,
			sex:sex
		}
		if(validateEmail(email) == true && validatePassword(password)){
			Meteor.call('regUser',profile, email, password, rerole);
			Bert.alert( 'Register success', 'success', 'growl-top-right' );
			//Clear form
			e.target.username.value="";
			e.target.firstname.value="";
			e.target.lastname.value="";
			e.target.role.value="";
			$('#password').val('');
			$('#email').val('');  
		}else{
			if(validatePassword(password) == false){
				Bert.alert( 'Password must be 6 or more charactor!', 'warning', 'growl-top-right' );	
			}
			if(validateEmail(email) == false){
				Bert.alert( 'Email is invalid!', 'warning', 'growl-top-right' );
			}
				
			
		}

			
		
    }
    
});