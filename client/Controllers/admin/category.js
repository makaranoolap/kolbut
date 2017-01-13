Session.set('img_banner_cat','');
Template.category.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title_en = $('#title_en').val();
		var title_kh = $('#title_kh').val();
		var title_ch = $('#title_ch').val();
		var parent = $('#parent').val();
		if(title_en && title_kh && title_ch){

			var obj = {
				en:{
					title:title_en
				},
				kh:{
					title:title_kh
				},
				ch:{
					title:title_ch
				},
				parent:parent,
				image:getIdImgBannerCat(this._id,Session.get('img_banner_cat'))
			}
			if(this._id){
				Meteor.call('editCate',this._id,obj,function(err){
					if(!err){
						Bert.alert( 'Udate Successfull!', 'success', 'growl-top-right' );
						Router.go("/managecategory");
					}
				})
			}else{
				Meteor.call("addCate",obj,function(err){
					if(!err){
						$('#title').val('');
						$('#parent').val('');
						Bert.alert( 'Add Successfull', 'success', 'growl-top-right' );
					}
				});
			}
			
			Session.set('img_banner_cat','');
			Router.go("/managecategory");
		}else{
			if(title_ch == ''){
				Bert.alert( 'Please input Title China!', 'warning', 'growl-top-right' );	
			}
			if(title_kh == ''){
				Bert.alert( 'Please input Title Khmer!', 'warning', 'growl-top-right' );	
			}
			if(title_en == ''){
				Bert.alert( 'Please input Title English!', 'warning', 'growl-top-right' );	
			}
			
		}
	},
	'change #file': function(event, template) {
		event.preventDefault();
		var id = this._id;
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				if(id){
					Meteor.call('updateImgBannerCat',id,fileObj._id);
				}else{
					Session.set('img_banner_cat',fileObj._id);
				}
				
			});
		}
	},
	
});

Template.category.helpers({
	getImgUpload:function(image){
		if(image){
			return {image:image};
		}else{
			return {image:Session.get('img_banner_cat')};
		}
	},
	validate:function(image){
		if(image){
			return true;
		}else{
			return false;
		}
	},

});

Template.managecategory.events({
	'click #remove': function(e){
		e.preventDefault();
		var id = this._id;
		if (confirm("Are you sure?")) {
			Meteor.call('removeCate', id,function(err){
				Bert.alert( 'Remove Successfull!', 'success', 'growl-top-right' );
			});
		}
		
	}
});
Template.managecategory.helpers({
	getBannerCategory:function(id){
    	var result = categories.findOne({_id:id});
    	var image ='';
    	if(result.image && result.image!==null && result.image!=='undefine'){
    		image = result.image;
    	}
		return {image:image};
	}
})
Template.category.helpers({
    getParent:function(parent){
    	if(parent){
    		return categories.findOne({_id:parent});
    	}else{
    		return;
    	}
    }
    
});	

