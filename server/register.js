Meteor.methods({
	regUser:function(profile, email, password, rerole){
			targetUserId = Accounts.createUser({
				email: email,
				password: password,
				profile:profile
			});
			console.log(targetUserId);
			//Roles.setUserRoles(id, roleid, 'noolab')
			Roles.setUserRoles(targetUserId, [rerole],'mygroup')
		}
});
