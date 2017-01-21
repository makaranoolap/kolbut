//=====gobal function server=======
listUserByPage = function(options,lang){
   var opt = {
        limit: 10
    };
    if (options) {
        if (Number(options.skip) > 0) {
            opt.skip = Number(options.skip);
        }
    }
    return Meteor.users.find({},opt); 
}

listPostByPage = function(options,lang){
   var opt = {
        limit: 10
    };
    if (options) {
        if (Number(options.skip) > 0) {
            opt.skip = Number(options.skip);
        }
    }
    
    return post.find({},opt);
}
Meteor.publish('about',function(){
    return post.find({location:'about'});
})

Meteor.publish('listProductByPageFront',function(page){
    return listProductByPageFront(page);
})
listProductByPageFront = function(page){
    var query = {location:'product'};
    var sort = {sort: {date_created: -1}};
    var result =  post.find(query,sort);
    var post_array = result.fetch();
    var arrayId = createPagByArrayId(page,post_array);
    return post.find({_id:{$in:arrayId}});

}

createPagByArrayId = function(page,resultArray){
    var arrayId = [];
    var i = 0;
    var limit = 12;
    var offset = page -1;
    var i = limit*offset;
    var n = limit*page;
    if(resultArray.length > 0 && i<=resultArray.length){
        for(i; i<n ;i++){
            if(resultArray[i]){
               arrayId.push(resultArray[i]._id); 
            }
            
        }
    }
    return arrayId;
}

searchUsers = function(keyword,limit){
    if(keyword){
        var result = Meteor.users.find({$or:[{ 'profile.username' : {$regex : new RegExp(keyword, "i")}},{'profile.firstname': {$regex : new RegExp(keyword, "i")}},{'profile.lastname': {$regex : new RegExp(keyword, "i")}}]},{limit:limit}); 
        return result;  
    }else return;          
}

listUserByPageSearch = function(options,keyword){
    var query = { 'profile.username' : {$regex : new RegExp(keyword, "i")}};
   var opt = {
        limit: 10
    };
    if (options) {
        if (Number(options.skip) > 0) {
            opt.skip = Number(options.skip);
        }
    }
    var result = Meteor.users.find(query,opt);  
    return result;
}

listPostByPageSearch = function(options,keyword){
    var query = { 
        $or:[
            {'en.title' : {$regex : new RegExp(keyword, "i")}},
            {'kh.title' : {$regex : new RegExp(keyword, "i")}},
            {'ch.title' : {$regex : new RegExp(keyword, "i")}}
            ]    
    };
    var opt = {
        limit: 12
    };
    if (options) {
        if (Number(options.skip) > 0) {
            opt.skip = Number(options.skip);
        }
    }
    var result = post.find(query,opt); 
    if(!keyword){
        result='';
    }
    return result;
}

mapChildId = function(parentId){
    var attrId = [];
    attrId.push(parentId);
    var cate = categories.find({parent:parentId});
    if(cate.count() > 0){
        cate.forEach(function(v){
            var result = categories.findOne({parent:v._id});
            if(result){
                return mapChildId(v._id);
            }else{
                attrId.push(v._id);
            }
        }); 
    }
    
    return attrId;
}
findParent = function(child){
    var cate = categories.findOne({_id:child});
    if(cate){
        var parent = cate.parent;
        if(parent =='0'){
            return cate._id;
        }else{
            return findParent(parent);
        }  
    }
    
}
getUnique =function(count,arrayNum) {
  // Make a copy of the array
  var tmp = arrayNum.slice(arrayNum);
  var ret = [];
  
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;  
}
//=====end gobal function server===
Meteor.publish('servicedetais',function(slug,lang){
    var result ='';
    switch(lang){
        case 'en':
            result = post.find({'en.title':slug});
        case 'kh':
            result = post.find({'kh.title':slug});
        case 'ch':
            result = post.find({'ch.title':slug});
    }
    return result;
})
Meteor.publish('details',function(id){
    var new_array = [];
    var p = post.findOne({_id:id});
    if(p){ 
        var parent = findParent(p.category);
        var arrayId = mapChildId(parent);
        console.log('Helo='+arrayId);
        var posts = post.find({category:{$in:arrayId}});
        var arrayRandom = [];
        posts.forEach(function(v){
            if(v._id !== id){
                arrayRandom.push(v._id);
            }   
        });
        new_array = getUnique(4,arrayRandom);
        new_array.push(p._id);
        var result = post.find({_id:{$in:new_array}});
        console.log('DATA=='+result.count());
        return result;
    }
    
})

Meteor.publish('userPageList',function(options){
    var user = listUserByPage(options);
    return user;
    
})
Meteor.publish('PostPageList',function(options,lang){
    var posts = listPostByPage(options,lang);
    return posts;
    
})
Meteor.publish('PageListProduct',function(options,lang){
    var posts = listPostByPageFront(options,lang);
    return posts;
    
})


//====Start Search====
Meteor.publish('searchUsers',function(keyword,limit){
    var result = searchUsers(keyword,limit);
    console.log('User=='+result.count());
    return result;
})

Meteor.publish('listUserByPageSearch',function(options,keyword){
    return listUserByPageSearch(options,keyword);
})
Meteor.publish('listPostByPageSearch',function(options,keyword){
    return listPostByPageSearch(options,keyword);
})
//====End Search=====


Meteor.publish('images',function(){
    return images.find();
})

Meteor.publish("post", function (lang) {
    var result = '';
    switch(lang){
        case 'en':
            result = post.find({},{fields:{'_id':1,'en':1,'images':1,'category':1,'location':1,'code':1}});
            break;
        case 'kh':
            result = post.find({},{fields:{'_id':1,'kh':1,'images':1,'category':1,'location':1,'code':1}});
             break;
        case 'ch':
            result = post.find({},{fields:{'_id':1,'ch':1,'images':1,'category':1,'location':1,'code':1}});
             break;
    }
    return result;
});
Meteor.publish("listpostFront",function(){
    var result = post.find({location:'product'},{sort: {date_created: -1},limit:12});
    return result;
})
Meteor.publish('getPostToEdit',function(id){
    return post.find({_id:id});
})

Meteor.publish('categories',function(lang){
    return categories.find();
})
Meteor.publish('slider',function(lang){
    var result = '';
    switch(lang){
        case 'en':
            result = slider.find({},{fields:{'_id':1,'en':1,'images':1, 'location':1}});
            break;
        case 'kh':
            result = slider.find({},{fields:{'_id':1,'kh':1,'images':1, 'location':1}});
             break;
        case 'ch':
            result = slider.find({},{fields:{'_id':1,'ch':1,'images':1, 'location':1}});
             break;
    }
    return result;
})
Meteor.publish('getSliderById',function(id){
    return slider.find({_id:id});
})

Meteor.publish("getService", function (lang) {
    var result = '';
    switch(lang){
        case 'en':
            result = post.find({location:'service'},{fields:{'_id':1,'en':1,'images':1,'location':1}});
            break;
        case 'kh':
            result = post.find({location:'service'},{fields:{'_id':1,'kh':1,'images':1,'location':1}});
             break;
        case 'ch':
            result = post.find({location:'service'},{fields:{'_id':1,'ch':1,'images':1,'location':1}});
             break;
    }
    return result;
});
Meteor.publish("getNews", function (lang) {
    var result = '';
    switch(lang){
        case 'en':
            result = post.find({location:'news'},{fields:{'_id':1,'en':1,'images':1,'location':1}});
            break;
        case 'kh':
            result = post.find({location:'news'},{fields:{'_id':1,'kh':1,'images':1,'location':1}});
             break;
        case 'ch':
            result = post.find({location:'news'},{fields:{'_id':1,'ch':1,'images':1,'location':1}});
             break;
    }
    return result;
});
Meteor.publish('listProductByCategory',function(categoryId,page){
    var catIdArray =[];
    catIdArray = mapChildId(categoryId);
    catIdArray.push(categoryId);
    var query = {$and:[{location:'product'},{category:{$in:catIdArray}}]}
    var sort = {sort: {date_created: -1}};
    var result = post.find(query,sort);
    var post_array = result.fetch();
    var arrayId = createPagByArrayId(page,post_array);
    return post.find({_id:{$in:arrayId}});
})
