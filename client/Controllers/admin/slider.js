Session.set('img_slider','');
Template.addslider.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title_en = $('#title_en').val();
		var title_kh = $('#title_kh').val();
		var title_ch = $('#title_ch').val();
		var location = $('#location').val();
		if(title_en && title_kh && title_ch && location){

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
				location:location,
				images:getIdImgSlider(this._id,Session.get('img_slider'))
			}
			if(this._id){
				Meteor.call('updateSlider',this._id,obj,function(err){
					if(!err){
						Bert.alert( 'Udate Successfull!', 'success', 'growl-top-right' );
						Session.set('img_slider','');
						Router.go("/manageslider");
					}
				})
			}else{
				Meteor.call("addSlider",obj,function(err){
					if(!err){
						$('#title').val('');
						$('#parent').val('');
						Session.set('img_slider','');
						Bert.alert( 'Add Successfull', 'success', 'growl-top-right' );
					}
				});
			}
			

			Router.go("/manageslider");
		}else{
			if(location == ''){
				Bert.alert( 'Please Select Location!', 'warning', 'growl-top-right' );	
			}
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
					Meteor.call('updateImgSlider',id,fileObj._id);
				}else{
					Session.set('img_slider',fileObj._id);
				}
				
			});
		}
	},
	'click #img-delete':function(e){
		e.preventDefault();
		var imgId = $(e.currentTarget).attr('img-id');
		var id = $(e.currentTarget).attr('data-id');
		Session.set('img_slider','');
		Meteor.call('removeFile',imgId);
		if(id){
			Meteor.call('removeIdImgSlider',id);
		}
	}
	
});
Template.addslider.helpers({
	getImgUpload:function(image){
		if(image){
			return {image:image};
		}else{
			return {image:Session.get('img_slider')};
		}
	},
	validate:function(image){
		if(image){
			return true;
		}else{
			return false;
		}
	}
});
Template.manageslider.helpers({
	getSlider:function(){
		return slider.find();
	},
	getSliderBylanguage:function(result){
		var lang = Session.get('language');
		var obj ='';
		switch(lang){
			case 'en':
				obj={
					title:result.en.title
					
				}
				break;
			case 'kh':
				obj={
					title:result.kh.title
				}
				break;
			case 'ch':
				obj={
					title:result.ch.title
					
				}
				break;

		}
		return obj;
		
	}
})
Template.manageslider.events({
	'click #remove-slider':function(e){
		e.preventDefault();
		if(confirm('Do you want to remove ?')){
			Meteor.call('removeSlider',this._id);
		}
	}
})


