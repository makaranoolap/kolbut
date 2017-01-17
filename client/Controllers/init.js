Session.setDefault("items.list.page", 1);
Session.setDefault("items.list.limit", 10);
Session.setDefault('keyword','');
Template.manageRole.onCreated(function(){
    Tracker.autorun(function(){
        var limit = Session.get("items.list.limit");
        var offset = (Session.get("items.list.page") - 1) * limit;
        Meteor.subscribe('userPageList',{skip: offset}); 
    })
    
});


Template.usersearch.onCreated(function(){
    Tracker.autorun(function(){
        var limit = Session.get("items.list.limit");
        var offset = (Session.get("items.list.page") - 1) * limit;
        //=====seach====
        if(Session.get('keyword')){
	        var keyword = Session.get('keyword');
	        Meteor.subscribe('listUserByPageSearch',{skip: offset},keyword);	
        }
        
        //=====end seach==
    })
    
});
Template.header.onCreated(function(){
    Tracker.autorun(function(){
        if(Session.get('keyword')){
	    	var searchlimit = 10;
	        var keyword = Session.get('keyword');
	        Meteor.subscribe('searchUsers',keyword,searchlimit);	
        }
        changeLanguage(Session.get('language'));
        Meteor.subscribe('categories',Session.get('language'))

    })
    
});
Template.home.onCreated(function(){
    Tracker.autorun(function(){
        Meteor.subscribe('slider',Session.get('language'))
        
    }) 
})
Template.mainAdmin.onCreated(function(){
    Tracker.autorun(function(){
        Meteor.subscribe('categories',Session.get('language'))
        Meteor.subscribe('slider',Session.get('language'))
    })   
});
Template.managepost.onCreated(function(){
      
});
// Template.listproduct.onCreated(function(){
//     Tracker.autorun(function(){
//         Meteor.subscribe("post",Session.get('language'));
        
//     }) 
// })
Template.details.onCreated(function(){
    Tracker.autorun(function(){
        Meteor.subscribe('categories',Session.get('language')) 
    }) 
})
Template.service.onCreated(function(){
    Tracker.autorun(function(){
        Meteor.subscribe("getService",Session.get('language'));
    }) 
})
Template.newsEvent.onCreated(function(){
    Tracker.autorun(function(){
        Meteor.subscribe("getNews",Session.get('language'));
    }) 
})
Template.project.onCreated(function(){
    Tracker.autorun(function(){
        Meteor.subscribe("getNews",Session.get('language'));
    }) 
})



