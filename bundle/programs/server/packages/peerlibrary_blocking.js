(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var blocking;

(function(){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/peerlibrary_blocking/packages/peerlibrary_blocking.js                    //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
(function () {                                                                       // 1
                                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                             //    // 4
// packages/peerlibrary:blocking/server.js                                     //    // 5
//                                                                             //    // 6
/////////////////////////////////////////////////////////////////////////////////    // 7
                                                                               //    // 8
(function () {                                                                 // 1  // 9
  // Inside blocking context functions should not be throwing exceptions but   // 2  // 10
  // call callback with first argument an error. Exceptions will not propagate // 3  // 11
  // and will only be printed to the console.                                  // 4  // 12
  blocking = function (obj, fun) {                                             // 5  // 13
    if (!fun) {                                                                // 6  // 14
      fun = obj;                                                               // 7  // 15
      obj = undefined;                                                         // 8  // 16
    }                                                                          // 9  // 17
	var wrapped;                                                                  // 10
	if (Meteor.wrapAsync) {                                                       // 11
      wrapped = Meteor.wrapAsync(fun);                                         // 12
    }                                                                          // 13
	else {                                                                        // 14
      wrapped = Meteor._wrapAsync(fun);                                        // 15
	}                                                                             // 16
    var f = function () {                                                      // 17
      if (typeof obj === 'undefined') {                                        // 18
        obj = this;                                                            // 19
      }                                                                        // 20
      return wrapped.apply(obj, arguments);                                    // 21
    };                                                                         // 22
    f._blocking = true;                                                        // 23
    return f;                                                                  // 24
  };                                                                           // 25
})();                                                                          // 26
                                                                               // 27
/////////////////////////////////////////////////////////////////////////////////    // 36
                                                                                     // 37
}).call(this);                                                                       // 38
                                                                                     // 39
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['peerlibrary:blocking'] = {
  blocking: blocking
};

})();

//# sourceMappingURL=peerlibrary_blocking.js.map
