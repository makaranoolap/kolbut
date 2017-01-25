Meteor.startup(function () {
  if (Meteor.users.find().fetch().length === 0) {
    var users = [
        {name:"admin",email:"admin@gmail.com",roles:['admin']},
        {name:"kollbothkhmer",email:"kollbothkhmer@kollbothkhmer.com",roles:['admin']}
      ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: "679798DY",
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come 
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, 'mygroup');
      }

    });
  }
});

Meteor.methods({
  deleteuser: function(id) {
    return Meteor.users.remove(id);
  },
  updateUserRole:function(id,attrRole){
    return Meteor.users.update(id,{$set:{roles:attrRole}});
  },
  updateEmail:function(id,attrEmail){
    return Meteor.users.update(id,{$set:attrEmail});
  },
  registerUser:function(username,email,password,role){
    targetUserId=Accounts.createUser({
        username:username,
        email: email,
        password: password
       });
    console.log(targetUserId);
    // Roles.setUserRoles(id,'member')
    Roles.setUserRoles(targetUserId, [role], 'mygroup')
  },
  updateUserById:function(id,firstname,lastname,username,email){
    Meteor.users.update({_id:id},{$set:{"emails.0.address":email,"profile":{firstname:firstname,lastname:lastname,username:username}}});
    return true;
  },
  numberRowUser:function(){
    this.unblock();
    var user = Meteor.users.find({},{fields:{_id:1}});
    return user.count();
  },
  numberRowUserSearch:function(keyword){
    this.unblock();
    var user = Meteor.users.find({ 'profile.username' : {$regex : new RegExp(keyword, "i")}},{fields:{_id:1}});
    console.log('NUM=='+user.count());
    return user.count();
  },
  getListUserIds:function(options){
    this.unblock();
    var result = listUserByPage(options);
    var ID = [];
    if(result.count() > 0){
      result.forEach(function(v){
        ID.push(v._id);
      })
      return ID;
    }
  },
  getListUserIdsBySearch:function(options,keyword){
    this.unblock();
    var result = listUserByPageSearch(options,keyword);
    var ID = [];
    console.log('SER=='+result.count())
    if(result.count() > 0){
      result.forEach(function(v){
        ID.push(v._id);
      })
      console.log('id=='+ID);
      return ID;
    }
  }


});
