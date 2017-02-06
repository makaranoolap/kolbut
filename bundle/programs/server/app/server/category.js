(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/category.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.methods({                                                       // 1
	addCate: function (obj) {                                             // 2
		console.log(obj);                                                    // 3
		categories.insert(obj);                                              // 4
	},                                                                    //
	editCate: function (id, obj) {                                        // 6
		categories.update({ _id: id }, { $set: obj });                       // 7
	},                                                                    //
	removeCate: function (id) {                                           // 9
		this.unblock();                                                      // 10
		categories.remove({ _id: id });                                      // 11
	}                                                                     //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=category.js.map
