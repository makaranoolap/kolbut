Template.listproduct.helpers({
	getAllPostNew:function(){
		var result =  post.find();
		return result;
	},
	//====start pagination ======
    totalPage:function(){
        var keyword = Session.get('keyword');
        Meteor.call('numberRowPost',keyword,Session.get('categoryId'),function(err,data){
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
        var page_float=Session.get('mumPro') / 12;

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
        var html = '';
        for( i  ; i <= show_page  ; i++){
            if(i>0){
                if(numberOfpages ==i){
                    html+='<li><a class="page_number'+i+' active" href="#" id="number" >'+i+'</a></li>';
                }else{
                    html+='<li><a class="page_number'+i+'" href="#" id="number" >'+i+'</a></li>'; 
                } 
               
            }

            
        }
        return html;
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
    getCateToBreadscom:function(){
        var id = Session.get('categoryId');
        var lang = Session.get('language');
        var childId = mapParentId(id);
        var result = categories.find({_id:{$in:childId}});
        var html ='';
        if(result.count() > 0){
            result.forEach(function(v,index){
                if(index == 0){
                    html+='<li style="color:#af0e05;">/</li>';
                    html+='<li><a href="/listproduct/category/'+v._id+'.html">'+v.en.title+'</a></li>'  
                }else{
                    html+='<li style="color:#af0e05;">/</li>';
                    html+='<li><span>'+v.en.title+'</span></li>'
                }
                
            })
        }
        return html;
    }
    //====end pagination ======
	
})
Template.listproduct.events({
	//=====start pagination===
    'click #number':function(e){
        e.preventDefault();
        var num=Number($(e.currentTarget).text());
        var selector='.page_number'+num;b
        $(selector).addClass('active');
        $(selector).parent().prevAll('li').children('a').removeClass('active');
        $(selector).parent().nextAll('li').children('a').removeClass('active');
        Session.set('items.list.page',num);
        if(Session.get('keyword')){
           Router.go('/search/keyword/'+slugUrl(Session.get('keyword'))+'/page/'+num); 
        }else{
           Router.go('/listproduct/page/'+num); 
        }
        var currentRoute = window.location.href;
        if(currentRoute.indexOf('category')!==-1){
           Router.go('/listproduct/category/'+Session.get('categoryId')+'/page/'+num);  
        }
    },
    'click #next':function(e){
        e.preventDefault();
        var num = Session.get('items.list.page') + 1;
        Session.set('items.list.page',num);
        var selector='.page_number'+num
        $(selector).addClass('active');
        $(selector).parent().prevAll('li').children('a').removeClass('active');
        $('#prev').removeClass('pagehide');
        if(Session.get('keyword')){
           Router.go('/search/keyword/'+Session.get('keyword')+'/page/'+num); 
        }else{
           Router.go('/listproduct/page/'+num); 
        }
        var currentRoute = window.location.href;
        if(currentRoute.indexOf('category')!==-1){
           Router.go('/listproduct/category/'+Session.get('categoryId')+'/page/'+num);  
        }
    },
    'click #prev':function(e){
        e.preventDefault();
        var num = Session.get('items.list.page') - 1;
        Session.set('items.list.page',num);
        var selector='.page_number'+num
        $(selector).addClass('active');
        $(selector).parent().nextAll('li').children('a').removeClass('active');
        if(Session.get('keyword')){
           Router.go('/search/keyword/'+Session.get('keyword')+'/page/'+num); 
        }else{
           Router.go('/listproduct/page/'+num); 
        }
        var currentRoute = window.location.href;
        if(currentRoute.indexOf('category')!==-1){
           Router.go('/listproduct/category/'+Session.get('categoryId')+'/page/'+num);  
        }
    }
    //=====end paginastion====
})