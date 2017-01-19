Session.set('img_post','');
Template.addpost.events({
	'click #post_add':function(e){
		alert();
		e.preventDefault();
		var title_en = $('#title-en').val();
		var description_en = CKEDITOR.instances.editor1.getData();
		var title_kh = $('#title-kh').val();
		var description_kh = CKEDITOR.instances.editor2.getData();
		var title_ch = $('#title-ch').val();
		var description_ch = CKEDITOR.instances.editor3.getData();
		var category = $('#category').val();
		var location = $('#location').val();
		var code = $('#code').val();
		var order =$('#order').val();
		var date_created = convertTimestamp($('#date_created').val());
		if(this._id){
			date_created = this.date_created;
		}
		var arrayIdImg = convertStringToArray(Session.get('img_post'),':');
		var images = getIdImgPost(this._id,arrayIdImg);
		if(title_en && description_en && title_kh && description_kh && title_ch && description_ch && category && location && code){
			var obj={
					en:{
						title:title_en,
						description:description_en,
					},
					kh:{
						title:title_kh,
						description:description_kh
					},
					ch:{
						title:title_ch,
						description:description_ch
					},
					images:images,
					category:category,
					location:location,
					code:code,
					order:Number(order),
					date_created:date_created
					
				}
			if(this._id){
				Meteor.call('editPost',this._id,obj,function(err){
					if(!err){
						$('#title-en').val('');
						$('#description-en').val('');
						$('#title-kh').val('');
						$('#description-kh').val('');
						$('#title-ch').val('');
						$('#description-ch').val('');
						$('#category').val('');
						Session.set('img_post','');
						Bert.alert( 'Update Successfull', 'success', 'growl-top-right' );
						Router.go('/managepost');																																																				
					}
				});

			}else{
				
				Meteor.call('addpost',obj,function(err){
					if(!err){
						$('#title-en').val('');
						$('#description-en').val('');
						$('#title-kh').val('');
						$('#description-kh').val('');
						$('#title-ch').val('');
						$('#description-ch').val('');
						$('#category').val('');
						Session.set('img_post','');
						Bert.alert( 'Add Successfull', 'success', 'growl-top-right' );
						Router.go('/managepost');
					}
				});
				
			}	
			
		}else{
			if(code == ''){
				Bert.alert( 'Please Input Product Code!', 'warning', 'growl-top-right' );
			}
			if(location == ''){
				Bert.alert( 'Please select lacation!', 'warning', 'growl-top-right' );
			}
			if(category == ''){
				Bert.alert( 'Please select category!', 'warning', 'growl-top-right' );
			}
			if(description_ch == ''){
				Bert.alert( 'Please input description chiness language!', 'warning', 'growl-top-right' );
			}
			if(title_ch == ''){
				Bert.alert( 'Please input title chiness language!', 'warning', 'growl-top-right' );
			}
			if(description_kh == ''){
				Bert.alert( 'Please input description khmer language!', 'warning', 'growl-top-right' );
			}
			if(title_kh == ''){
				Bert.alert( 'Please input title khmer language!', 'warning', 'growl-top-right' );
			}
			if(description_en == ''){
				Bert.alert( 'Please input description enlish language!', 'warning', 'growl-top-right' );
			}
			if(title_en == ''){
				Bert.alert( 'Please input title enlish language!', 'warning', 'growl-top-right' );
			}
			
		}

	},
	"click #img-delete": function(e, tpl) {
		
		if (confirm("Are you sure?")) {
			var id = $(e.currentTarget).attr('data-id');
			var img_id = $(e.currentTarget).attr('img-id');
			if(id){
				Meteor.call('removeIdImgFromPost',id,img_id);
				Meteor.call('removeFile', img_id);	
			}else{
				var ses = Session.get('img_post');
				var currentSess = ses.replace(img_id,'');
				Session.set('img_post',currentSess);
				Meteor.call('removeFile', img_id);
			}
			
        	
    	}
		
		
	},
 	'change #file': function(event, template) {
		event.preventDefault();
		var id = this._id;
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				if(Session.get('img_post')){
					var currentSes = Session.get('img_post')+':'+fileObj._id;
				}else{
					var currentSes = fileObj._id;
				}

				Session.set('img_post',currentSes);

				if(id){
					console.log('id='+id);
					Meteor.call('updateImagePost',id,fileObj._id);
				}
			
			});
		}
	}
	

    

});
Template.addpost.helpers({
	ListImgUpload:function(images){
		if(images && images.length>0){
			return images;
		}else{
			console.log('aaaa'+Session.get('img_post'));
			var arrayIdImg = convertStringToArray(Session.get('img_post'),':');
			console.log('arrayIdImg=='+arrayIdImg);
			return arrayIdImg;
		}
	},
    getParent:function(parent){
    	if(parent){
    		return categories.findOne({_id:parent});
    	}else{
    		return;
    	}
    }
})
Template.addpost.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	format: 'DD/MM/YYYY'
    });
});
Template.managepost.helpers({
	getStyleScroll:function(images){
		if(images && images.length > 1){
			return 'overflow:scroll;height:100px;';
		}else{
			return;
		}
	},
	limitString:function(str){
		var text_end = '';
		if(str.length >100){
			text_end = '...'
		}
		var trimmedString = str.substring(0, 100);
		return trimmedString+' '+text_end;
	},
	getPostByLanguage:function(result){
		var lang = Session.get('language');
		var obj ='';
			switch(lang){
				case 'en':
					obj={
						title:result.en.title,
						description:result.en.description,
						category:result.en.category
					}
					break;
				case 'kh':
					obj={
						title:result.kh.title,
						description:result.kh.description,
						category:result.kh.category
					}
					break;
				case 'ch':
					obj={
						title:result.ch.title,
						description:result.ch.description,
						category:result.ch.category
					}
					break;

			}
			return obj;
		
	},
	//====start pagination ======
    totalPage:function(){
        Meteor.call('numberRowPost' ,function(err,data){
            if(!err){
                if(data<= 10){
                    $('#mypagination').addClass('pagehide');
                }else{
                    $('#mypagination').removeClass('pagehide');
                }
                Session.set('mumPro',data);
                //alert('PROID=='+data.proId);
            }
        })
        var page_float=Session.get('mumPro') / Session.get('items.list.limit');

        var intvalue = Math.ceil( page_float ); 
        Session.set('totalPage',intvalue);
        var pages=[];
        var numberOfpages = Session.get('items.list.page');
        var i=1;
        var show_page=intvalue;
        if(intvalue >= 10){
          show_page = 10;  
        }
        
        if(numberOfpages >= 7){
            i = numberOfpages - 5;
            if(numberOfpages <= intvalue - 4){
               show_page = numberOfpages + 4; 
            }else{
                show_page = intvalue;
                i=intvalue - 10;
            }
             
        }
        for( i  ; i <= show_page  ; i++){
            if(i>0)
               pages.push(i); 
            
        }
        return pages;
    },
    totalPages:function(){
        
        if(Session.get('totalPage')<=10){
            $('#first_admin').addClass('pagehide');
        }else{
             $('#first_admin').removeClass('pagehide');
        }

        return Session.get('totalPage');
    },
    showNext:function(){
    	var number_pages = Session.get('totalPage');
    	if(number_pages > Session.get('items.list.page')){
    		return true;
    	}else return false;
    },
    showPrev:function(){
    	if(Session.get('items.list.page') > 1 ){
    		return true;
    	}else return false;
    },
    showLastPage:function(){
    	var number_pages = Session.get('totalPage');
    	if(number_pages >10 && (Session.get('items.list.page') + 4) <= number_pages ){
    		return true;
    	}else return false;
    },
    //====end pagination ======
})
Template.managepost.events({

	'click #remove':function(e){
		e.preventDefault();
		if (confirm("Do you want to remove?")) {
			var id = this._id;
			Meteor.call('removePost',id);
    	}
	},
	//=====start pagination===
    'click #number':function(e){
        e.preventDefault();
        var num=Number($(e.currentTarget).text());
        var selector='.page_number'+num;
        $(selector).addClass('active');
        $(selector).parent().prevAll('li').children('a').removeClass('active');
        $(selector).parent().nextAll('li').children('a').removeClass('active');
        Session.set('items.list.page',num);
        Router.go('/post/page/'+num);

        
    },
    'click #next':function(e){
        e.preventDefault();
        var num = Session.get('items.list.page') + 1;
        Session.set('items.list.page',num);
        var selector='.page_number'+num
        $(selector).addClass('active');
        $(selector).parent().prevAll('li').children('a').removeClass('active');
        $('#prev').removeClass('pagehide');
        Router.go('/post/page/'+num);
        //goToByScroll('go_toscroll');
    },
    'click #prev':function(e){
        e.preventDefault();
        var num = Session.get('items.list.page') - 1;
        Session.set('items.list.page',num);
        var selector='.page_number'+num
        $(selector).addClass('active');
        $(selector).parent().nextAll('li').children('a').removeClass('active');
        Router.go('/post/page/'+num);
        //goToByScroll('go_toscroll');
    },
    //=====end paginastion====
    'keyup #text_search':function(e){
    	e.preventDefault();
    	var code = e.keyCode || e.which;
    	var keyword = $(e.currentTarget).val();
    	$('.search-dropdown').removeClass('pagehide');
    	switch(code){
    		case 13 :
	    		Router.go('/postSearch/'+keyword);
	    		$('.search-dropdown').addClass('pagehide');
	    		break;
    		case 8 :
    			if(!keyword){
    				$('.search-dropdown').addClass('pagehide');
    			}
    			Session.set('keyword',keyword);
    			break;

    	}
    	Session.set('keyword',keyword);
    	Session.set('items.list.page',1);
    }
})