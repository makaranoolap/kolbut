 Template.uploadfile.events({
 	'change #file': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				//Session.set('banner', fileObj._id);
				//alert(fileObj_id);
			});
		}
	}
 })
 Template.uploadfile.helpers({
 	getFile:function(){
 		return images.find();
 	}
 })