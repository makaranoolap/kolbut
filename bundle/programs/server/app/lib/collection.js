(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collection.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
fullpath = "upload";                                                   // 2
                                                                       //
if (Meteor.isServer) {                                                 // 4
	fullpath = process.env.PWD;                                           // 5
	console.log('linux path:' + fullpath);                                // 6
	if (typeof fullpath == 'undefined') {                                 // 7
		base_path = Meteor.npmRequire('fs').realpathSync(process.cwd() + '../../../../../../');
		console.log('window path:' + base_path);                             // 9
		//base_path = base_path.split('\\').join('/');                       //
		//base_path = base_path.replace(/\/\.meteor.*$/, '');                //
	} else {                                                              //
			base_path = fullpath;                                               // 13
		}                                                                    //
} else {                                                               //
	base_path = "/";                                                      // 18
}                                                                      //
                                                                       //
images = new FS.Collection("images", {                                 // 21
	stores: [new FS.Store.FileSystem("images", { path: base_path + "/upload" })]
});                                                                    //
                                                                       //
post = new Mongo.Collection('post');                                   // 25
language = new Mongo.Collection('language');                           // 26
categories = new Mongo.Collection('categories');                       // 27
slider = new Mongo.Collection('slider');                               // 28
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=collection.js.map
