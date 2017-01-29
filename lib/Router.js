Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/',{
    name:'home',
    waitOn:function(){
        return Meteor.subscribe('pages','home');
    },
    data:function(){
        var result = post.find({location:'home'},{sort:{order:1}});
        return {home:result};
    }
});

Router.route('/login', {
    layoutTemplate:'layoutlogin',
    name: 'login'
});
// register
Router.route('register', {
    name: 'register'
});

//mange Role userrs
Router.route('/managerole',{
    layoutTemplate:'mainAdmin',
    name:'manageRole'
});
Router.route('/updateuser/:id', {
    name: 'updateuser',
    data: function() {
        return Meteor.users.findOne({_id: this.params.id});
    }
    
});
Router.route('/userlist',{
    name:'userlist'
})
Router.route('/users/page/:num', {
    template: 'manageRole',
    data:function(){
        if(this.ready){
           Session.set("items.list.page",Number(this.params.num)); 
        }
        
    }
});
Router.route('/about',{
    name:'about',
    waitOn:function(){
        return Meteor.subscribe('pages','about');
    },
    data:function(){
        var result = post.find({location:'about'},{sort:{order:1}});
        return {about:result};
    }
});
Router.route('/usersearch/:keyword', {
    name: 'usersearch',
    data:function(){
        var keyword = this.params.keyword;
        Session.set('keyword',keyword);
    }
});
Router.route('/searchpagination/:keyword/:num', {
    name: 'searchpagination',
    data:function(){
        var keyword = this.params.keyword;
        Session.set('keyword',keyword);
        Session.set("items.list.page",Number(this.params.num)); 
    }
});
Router.route('/uploadfile',{
    name: 'uploadfile'
})
Router.route('/homeadmin',{
    layoutTemplate:'mainAdmin',
    name:'homeadmin'
})
Router.route('/managepost',{
    layoutTemplate:'mainAdmin',
    name:'managepost',
    waitOn:function(){
        return Meteor.subscribe("PostPageList",{skip: 0});
    },
    data:function(){
        if(this.ready){
            Session.set('items.list.page',1);
            var result =  post.find();
            return {getPost:result}; 
        }
        
    }
})
Router.route('/postSearch/:keyword', {
    template: 'managepost',
    layoutTemplate:'mainAdmin',
    waitOn:function(){
        var keyword = this.params.keyword;
        if(Session.set('keyword')){
            keyword=Session.set('keyword');
        }
        var limit = Session.get("items.list.limit");
        console.log('LIMIT=='+limit);
        var offset = (Session.get("items.list.page") - 1) * limit; 
        return [Meteor.subscribe('listPostByPageSearch',{skip: offset},keyword)]
    },
    data:function(){
        //Session.set('postIDs','');
        if(this.ready){ 
            return {getPost:post.find()};
        }
    }
});
Router.route('/post/page/:num', {
    template: 'managepost',
    layoutTemplate:'mainAdmin',
    waitOn:function(){
        Tracker.autorun(function(){
        var limit = Session.get("items.list.limit");
        var offset = (Session.get("items.list.page") - 1) * limit;
        return [Meteor.subscribe("PostPageList",{skip: offset})];
        }) ;
    },
    data:function(){
        if(this.ready){
           Session.set("items.list.page",Number(this.params.num)); 
            var result =  post.find();
            return {getPost:result};
        }   
    }
}); 
Router.route('/addpost',{
    layoutTemplate:'mainAdmin',
    name:'addpost'
})
Router.route('/editpost/:id',{
    layoutTemplate:'mainAdmin',
    template:'addpost',
    waitOn:function(){
        return [Meteor.subscribe('getPostToEdit',this.params.id)];
    },
    data:function(){
        return post.findOne({_id:this.params.id});
    }
})
Router.route('/category',{
    layoutTemplate:'mainAdmin',
    name:'category'
})
Router.route('/editcategory/:id',{
    layoutTemplate:'mainAdmin',
    template:'category',
    data:function(){
       return categories.findOne({_id:this.params.id}); 
    }
})
Router.route('/managecategory',{
    layoutTemplate:'mainAdmin',
    name:'managecategory'
})
Router.route('/manageslider',{
    layoutTemplate:'mainAdmin',
    name: 'manageslider'
})
Router.route('/addslider',{
    layoutTemplate:'mainAdmin',
    name: 'addslider'
})
Router.route('/editslider/:id',{
    layoutTemplate:'mainAdmin',
    template: 'addslider',
    waitOn:function(){
        return Meteor.subscribe('getSliderById',this.params.id);
    },
    data:function(){
        return slider.findOne({_id:this.params.id});
    }
})
Router.route('/listproduct/category/:id.html',{
    name:'listproduct',
    waitOn:function(){
        var page = 1;
        return [Meteor.subscribe('listProductByCategory',this.params.id,page)];
    },
    data:function(){
        var catIdArray =[];
        catIdArray = mapChildId(this.params.id);
        catIdArray.push(this.params.id);
        var result = post.find({category:{$in:catIdArray}});
        Session.set('categoryId',this.params.id);
        return {listPost:result,banner:getBannerCatById(this.params.id)}
    }
})
Router.route('/listproduct/category/:id/page/:page',{
    template:'listproduct',
    waitOn:function(){
        var page = this.params.page;
        return [Meteor.subscribe('listProductByCategory',this.params.id,page)];
    },
    data:function(){
        Session.set("items.list.page",Number(this.params.page));
        var catIdArray =[];
        catIdArray = mapChildId(this.params.id);
        catIdArray.push(this.params.id);
        var result = post.find({category:{$in:catIdArray}});
        Session.set('categoryId',this.params.id);
        return {listPost:result,banner:getBannerCatById(this.params.id)}
    }
})
Router.route('/listproduct/page/:num', {
    template: 'listproduct',
    waitOn:function(){
        var page  = this.params.num;
        Tracker.autorun(function(){
        // var limit = Session.get("items.list.limit");
        // var offset = (Session.get("items.list.page") - 1) * limit;
        return [Meteor.subscribe("listProductByPageFront",page)];
        }) ;
    },
    data:function(){
        if(this.ready){
           Session.set("items.list.page",Number(this.params.num)); 
           Session.set('keyword','');
           Session.set('categoryId','');
            var result =  post.find();
            return {listPost:result};
        }   
    }
});
Router.route('/search/:keyword',{
    template:'listproduct',
    waitOn:function(){
        var keyword = this.params.keyword;
        if(Session.get('keyword')){
            keyword=Session.get('keyword');
        }
        var limit = Session.get("items.list.limit");
        var offset = (Session.get("items.list.page") - 1) * limit; 
        return [Meteor.subscribe('listPostByPageSearch',{skip: offset},keyword)]
    },
    data:function(){
        if(this.ready){ 
            Session.set('keyword',this.params.keyword);
            Session.set('categoryId','');
            return {listPost:post.find()};
        }
    }
})
Router.route('/search/keyword/:keyword/page/:num',{
    template:'listproduct',
    waitOn:function(){
        var keyword = this.params.keyword;
        var num = this.params.num;
        if(Session.get('keyword')){
            keyword=Session.get('keyword');
        }
        var limit = 12;
        var offset = (num - 1) * limit; 
        return [Meteor.subscribe('listPostByPageSearch',{skip: offset},keyword)]
    },
    data:function(){
        if(this.ready){ 
            Session.set('keyword',this.params.keyword);
            Session.set('categoryId','');
            return {listPost:post.find()};
        }
    }
})
Router.route('/listproduct.html',{
    template:'listproduct',
    waitOn:function(){
        return [Meteor.subscribe('listpostFront')];
    },
    data:function(){
        Session.set('items.list.page',1);
        Session.set('keyword','');
        Session.set('categoryId','');
        return {listPost:post.find()};
    }
})
 
Router.route('/details/:id.html',{
    name:'details',
    waitOn:function(){
        return [Meteor.subscribe('details',this.params.id)]
    },
    data:function(){
        return post.findOne({_id:this.params.id});
    }
})
Router.route('/service',{
    name:'service',
    data:function(){
        var result = post.find({location:'service'});
        return {getService:result}
    }
})
Router.route('/service-details/:slug',{
    name:'servicedetails',
    waitOn:function(){
        Meteor.subscribe('servicedetais',this.params.slug,Session.get('language'));
    },
    data:function(){
        return {result:post.find()};
    }
})
Router.route('/newsEvent',{
    name:'newsEvent',
    data:function(){
        var result = post.find({location:'news'});
        return {getNews:result}
    }
})
Router.route('/contact',{
    name:'contact'
})
Router.route('/project',{
    template:'newsEvent',
    data:function(){
        var result = post.find({location:'news'});
        return {getNews:result}
    }
})
Router.route('/partner',{
    name:'partner'
})
