Session.set('language','en');
Template.header.events({
	'click #listuser':function(e){
		e.preventDefault();
		Session.set("items.list.page", 1);
		Router.go('/manageRole');

	},
    'keyup #search':function(e){
        e.preventDefault();
        var code = e.keyCode || e.which;
        var keyword = $(e.currentTarget).val();
        $('.search-dropdown').removeClass('pagehide');
        $('#custom-search-input').addClass('no-border-radius');
        switch(code){
            case 13 :
                Router.go('/search/'+keyword);
                $('.search-dropdown').addClass('pagehide');
                break;
            case 8 :
                if(!keyword){
                    $('.search-dropdown').addClass('pagehide');
                    $('#custom-search-input').removeClass('no-border-radius');
                }
                Session.set('keyword',keyword);
                break;

        }
        Session.set('keyword',keyword);
        Session.set('items.list.page',1);
    },
    'click #btn-search':function(e){
        e.preventDefault();
        var keyword = $('#search').val();
        Router.go('/search/'+keyword);
        $('.search-dropdown').addClass('pagehide');
    },
    'mouseup #text_search':function(e){
    	e.preventDefault();
    	$(e.currentTarget).val('');
    },
    'click #btn_search':function(e){
    	e.preventDefault();
    	var keyword = $('#text_search').val();
    	Session.set('keyword',keyword);
    	Session.set('items.list.page',1);
    	Router.go('/usersearch/'+keyword);
    },
    'click .lang':function(e){
        e.preventDefault();
        var lang = $(e.currentTarget).attr('lang');
        Session.set('language',lang);
        
    },
    'click #product-list':function(e){
        e.preventDefault();
        Router.go('/listproduct.html');
    }
});
Template.header.helpers({
    getLevelParentMenu:function(){
        return categories.find({parent:'0'});
    },
    getChildFirst:function(id){
        return categories.find({parent:id});
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
});
Template.usersearch.helpers({
	totalPage:function(){
        Meteor.call('numberRowUserSearch',Session.get('keyword') ,function(err,data){
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
Template.usersearch.events({
	//=====start pagination===
    'click #number':function(e){
        e.preventDefault();
        var num=Number($(e.currentTarget).text());
        var selector='.page_number'+num;
        $(selector).addClass('active');
        $(selector).parent().prevAll('li').children('a').removeClass('active');
        $(selector).parent().nextAll('li').children('a').removeClass('active');
        Session.set('items.list.page',num);
        var keyword = Session.get('keyword')
        Router.go('/searchpagination/'+keyword+'/'+num);

        
    },
    'click #next':function(e){
        e.preventDefault();
        var num = Session.get('items.list.page') + 1;
        Session.set('items.list.page',num);
        var selector='.page_number'+num
        $(selector).addClass('active');
        $(selector).parent().prevAll('li').children('a').removeClass('active');
        $('#prev').removeClass('pagehide');
        var keyword = Session.get('keyword')
        Router.go('/searchpagination/'+keyword+'/'+num);
        //goToByScroll('go_toscroll');
    },
    'click #prev':function(e){
        e.preventDefault();
        var num = Session.get('items.list.page') - 1;
        Session.set('items.list.page',num);
        var selector='.page_number'+num
        $(selector).addClass('active');
        $(selector).parent().nextAll('li').children('a').removeClass('active');
        var keyword = Session.get('keyword')
        Router.go('/searchpagination/'+keyword+'/'+num);
        //goToByScroll('go_toscroll');
    },
    //=====end paginastion====
    "click #remove": function(e, tpl) {
		var id=this._id;
		if (confirm("Are you sure?")) {
        	Meteor.call('deleteuser', id);
    	}
		
		
	},
	'click #edit':function(e){
		e.preventDefault();
		var firstname = $('#fname').val();
		var lastname = $('#lname').val();
		var username = $('#username').val();
		var email = $('#email').val();
		var id = $('#user_id').val();
		Meteor.call('updateUserById',id,firstname,lastname,username,email,function(err,data){
			if(err){
				console.log(err);
			}else{
                Bert.alert( 'Update Successfull', 'success', 'growl-top-right' );
            }

		});

	},
	'click .myedit':function(e){
		e.preventDefault();
		var firstname = this.profile.firstname;
		var lastname = this.profile.lastname;
		var username = this.profile.username;
		var email = this.emails[0].address;
		var id = this._id;
		$('#user_id').val(id);
		$('#fname').val(firstname);
		$('#lname').val(lastname);
		$('#username').val(username);
		$('#email').val(email);
	}
})

