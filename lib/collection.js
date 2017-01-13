
fullpath="upload";

if (Meteor.isServer) {
	fullpath=process.env.PWD;
	console.log('linux path:'+fullpath);
	if( typeof fullpath == 'undefined' ){
		base_path = Meteor.npmRequire('fs').realpathSync( process.cwd() + '../../../../../../' );
		console.log('window path:'+base_path);
		//base_path = base_path.split('\\').join('/');
		//base_path = base_path.replace(/\/\.meteor.*$/, '');
	}else{
		base_path=fullpath;
	}
	
}
else{
	base_path="/";
}

images = new FS.Collection("images", {
	stores: [new FS.Store.FileSystem("images", {path:base_path+"/upload"})]
});

post = new Mongo.Collection('post');
language =new Mongo.Collection('language');
categories = new Mongo.Collection('categories');
slider = new Mongo.Collection('slider');

