(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/userRole.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
  if (Meteor.users.find().fetch().length === 0) {                      // 2
    var users = [{ name: "admin", email: "admin@gmail.com", roles: ['admin'] }, { name: "kollbothkhmer", email: "kollbothkhmer@kollbothkhmer.com", roles: ['admin'] }];
                                                                       //
    _.each(users, function (user) {                                    // 8
      var id;                                                          // 9
                                                                       //
      id = Accounts.createUser({                                       // 11
        email: user.email,                                             // 12
        password: "679798DY",                                          // 13
        profile: { name: user.name }                                   // 14
      });                                                              //
                                                                       //
      if (user.roles.length > 0) {                                     // 17
        // Need _id of existing user record so this call must come     //
        // after `Accounts.createUser` or `Accounts.onCreate`          //
        Roles.addUsersToRoles(id, user.roles, 'mygroup');              // 20
      }                                                                //
    });                                                                //
  }                                                                    //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 27
  deleteuser: function (id) {                                          // 28
    return Meteor.users.remove(id);                                    // 29
  },                                                                   //
  updateUserRole: function (id, attrRole) {                            // 31
    return Meteor.users.update(id, { $set: { roles: attrRole } });     // 32
  },                                                                   //
  updateEmail: function (id, attrEmail) {                              // 34
    return Meteor.users.update(id, { $set: attrEmail });               // 35
  },                                                                   //
  registerUser: function (username, email, password, role) {           // 37
    targetUserId = Accounts.createUser({                               // 38
      username: username,                                              // 39
      email: email,                                                    // 40
      password: password                                               // 41
    });                                                                //
    console.log(targetUserId);                                         // 43
    // Roles.setUserRoles(id,'member')                                 //
    Roles.setUserRoles(targetUserId, [role], 'mygroup');               // 45
  },                                                                   //
  updateUserById: function (id, firstname, lastname, username, email) {
    Meteor.users.update({ _id: id }, { $set: { "emails.0.address": email, "profile": { firstname: firstname, lastname: lastname, username: username } } });
    return true;                                                       // 49
  },                                                                   //
  numberRowUser: function () {                                         // 51
    this.unblock();                                                    // 52
    var user = Meteor.users.find({}, { fields: { _id: 1 } });          // 53
    return user.count();                                               // 54
  },                                                                   //
  numberRowUserSearch: function (keyword) {                            // 56
    this.unblock();                                                    // 57
    var user = Meteor.users.find({ 'profile.username': { $regex: new RegExp(keyword, "i") } }, { fields: { _id: 1 } });
    console.log('NUM==' + user.count());                               // 59
    return user.count();                                               // 60
  },                                                                   //
  getListUserIds: function (options) {                                 // 62
    this.unblock();                                                    // 63
    var result = listUserByPage(options);                              // 64
    var ID = [];                                                       // 65
    if (result.count() > 0) {                                          // 66
      result.forEach(function (v) {                                    // 67
        ID.push(v._id);                                                // 68
      });                                                              //
      return ID;                                                       // 70
    }                                                                  //
  },                                                                   //
  getListUserIdsBySearch: function (options, keyword) {                // 73
    this.unblock();                                                    // 74
    var result = listUserByPageSearch(options, keyword);               // 75
    var ID = [];                                                       // 76
    console.log('SER==' + result.count());                             // 77
    if (result.count() > 0) {                                          // 78
      result.forEach(function (v) {                                    // 79
        ID.push(v._id);                                                // 80
      });                                                              //
      console.log('id==' + ID);                                        // 82
      return ID;                                                       // 83
    }                                                                  //
  }                                                                    //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=userRole.js.map
