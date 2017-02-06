(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/register.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.methods({                                                       // 1
	regUser: function (profile, email, password, rerole) {                // 2
		targetUserId = Accounts.createUser({                                 // 3
			email: email,                                                       // 4
			password: password,                                                 // 5
			profile: profile                                                    // 6
		});                                                                  //
		console.log(targetUserId);                                           // 8
		//Roles.setUserRoles(id, roleid, 'noolab')                           //
		Roles.setUserRoles(targetUserId, [rerole], 'mygroup');               // 10
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=register.js.map
