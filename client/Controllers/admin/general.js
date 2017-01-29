Template.registerHelper('getImg', function (id) {
    return getImg(id);
});
getImg = function(id){
    var img = images.findOne({_id:id});
    if(img){
        return img.copies.images.key;
    }else{
        return;
    }
}
Template.registerHelper('validateText',function(text){
    var lang = Session.get('language');
    var str = true;
    switch(lang){
        case 'en':
        if(text.en.description == '<p>no</p>'){
            str = false;
        }
        case 'kh':
        if(text.kh.description == '<p>no</p>'){
            str = false;
        }
        case 'ch':
        if(text.ch.description == '<p>no</p>'){
            str = false;
        }
    }
    return str;
})

Template.registerHelper('getDate', function (curdate) {
	var d = new Date(curdate);
	var str=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    return str;
});
convertTimestamp = function(date){
    date = new Date(date);
    var timestamp = date.valueOf() / 1000;
    return timestamp;
}

Template.registerHelper('numList',function(num){
    return num + 1;
})
Template.registerHelper('checkForEdit',function(id){
    if(id){
        return false;
    }else return true;
})

searchUsers = function(keyword,limit){
    if(keyword){
        var result = Meteor.users.find(
        {
            $or:[
                { 'profile.username' : {$regex : new RegExp(keyword, "i")}},
                {'profile.firstname': {$regex : new RegExp(keyword, "i")}},
                {'profile.lastname': {$regex : new RegExp(keyword, "i")}}
            ]
           
                
        },
        {limit:limit}).fetch(); 
        return result;  
    }else return;          
}
searchByTextShow = function(result,keyword){
    var arr = [];
    if(result.length > 0){
        for(var i=0;i<result.length;i++){
            var obj = {
                username_bold:searchTextBold(result[i].profile.username,keyword),
                username:result[i].profile.username
            }
            arr.push(obj);
        }
        return arr;
    }
}
searchTextBold = function(src_str,term){
    term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
    var pattern = new RegExp("("+term+")", "gi");
    src_str = src_str.replace(pattern, "<mark>$1</mark>");
    src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
    return src_str;
}
Template.registerHelper('getResultSeach',function(){
    return getResultSeach();
})
getResultSeach = function(){
        var keyword = Session.get('keyword');
        var limit = 10;
        var result = searchUsers(keyword,limit);
        result = searchByTextShow(result,keyword);
        return result;
}

Template.registerHelper('getRoles',function(permm){
    return permm.mygroup[0];
})

validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
validatePassword = function(password){
    var re = /^.{6,}$/;
    return re.test(password);
}

changeLanguage = function(lan){
    TAPi18n.setLanguage(lan);
}
convertStringToArray = function(str,sign){
    var arr = str.split(sign);
    var finalArray =[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]){
            finalArray.push(arr[i]);
        }
    }
    return finalArray;
}
getIdImgPost =  function(id,imagesIdarray){
    var imageId =[];
    if(id){
        var post_row = post.findOne({_id:id});
        if(post_row.images){
            imageId = post_row.images
        }
    }else{
        imageId = imagesIdarray;
    }
    return imageId;
}
getIdImgSlider =  function(id,idSes){
    var imageId =[];
    if(id){
        var post_row = slider.findOne({_id:id});
        if(post_row.images){
            imageId = post_row.images
        }
    }else{
        imageId = idSes;
    }
    return imageId;
}
getIdImgBannerCat =  function(id,idSes){
    var imageId =[];
    if(id){
        var post_row = categories.findOne({_id:id});
        if(post_row.image){
            imageId = post_row.image
        }
    }else{
        imageId = idSes;
    }
    return imageId;
}

Template.registerHelper('No',function(num){
    return(num + 1);
})
Template.registerHelper('getCategories',function(){
    var results = [];
    var mapChildren = function(cate, level) {
        var prefix = Array(1 + level).join('&nbsp;<i class="fa fa-long-arrow-right"></i>');
        var lang = Session.get('language');
        if(lang == 'en'){
            results.push({_id: cate._id, parent:cate.parent, title: prefix + cate.en.title});
        }
        if(lang == 'kh'){
         results.push({_id: cate._id, parent:cate.parent, title: prefix + cate.kh.title});
        }
        if(lang == 'ch'){
         results.push({_id: cate._id, parent:cate.parent, title: prefix + cate.ch.title});
        }
        var children = categories.find({parent: cate._id});
        children.forEach(function(item) {
            
            mapChildren(item, level + 1);
        }); 
    };
    var data=categories.find({parent: '0'});
    
    data.forEach( function(item) {
    
      mapChildren(item, 0);
    });
    return results;
})
getTitleCateByParent = function(parent){
    var lang = Session.get('language');
    var title = '';
    switch(lang){
        case 'en':
            var result = categories.finOne({_id:parent});
            if(result){
                title = result.en.title;
            }
            
            break;
        case 'kh':
            var result = categories.finOne({_id:parent});
            if(result){
                title = result.kh.title;
            }
            break;
        case 'ch':
            var result = categories.finOne({_id:parent});
            if(result){
                title = result.ch.title;
            }
            break;
    }
    return title;
}
Template.registerHelper('getCategoryById',function(id){
    var lang = Session.get('language');
    var title = '';
    var ID = '';
    var result = categories.findOne({_id:id});
    switch(lang){
        case 'en':
            if(result){
                ID = result._id
                title = result.en.title; 
            }
            
            break;
        case 'kh':
            if(result){
                ID = result._id
                title = result.en.title; 
            }
            break;
        case 'ch':
            if(result){
                ID = result._id
                title = result.en.title; 
            }
            break;
    }
    return {_id:ID,title:title};
})
Template.registerHelper('getCategoryByParent',function(parent){
    var lang = Session.get('language');
    var result = categories.findOne({_id:parent});
    var title = '';
    var id = ''
    switch(lang){
        case 'en':
            if(result){
                id = result._id;
                title = result.en.title; 
            }
            
            break;
        case 'kh':
            if(result){
                id = result._id;
                title = result.kh.title; 
            }
            break;
        case 'ch':
            if(result){
                id = result._id;
                title = result.ch.title; 
            }
            break;
    }
    return {_id:id,title:title};
})
Template.registerHelper('getPostByLanguage',function(result){
    return getPostByLanguage(result);
})
getPostByLanguage = function(result){
    var lang = Session.get('language');
    var obj ='';
    switch(lang){
        case 'en':
            if(result && result.en!== null && result.en!='undefine'){
                obj={
                title:result.en.title,
                description:result.en.description
                }
            }
            
            break;
        case 'kh':
            if(result && result.kh!== null && result.kh!='undefine'){
                obj={
                title:result.kh.title,
                description:result.kh.description
                }
            }
            break;
        case 'ch':
            if(result && result.ch!== null && result.ch!='undefine'){
                obj={
                title:result.ch.title,
                description:result.ch.description
                }
            }
            break;
    }
    return obj;
}
Template.registerHelper('getFirstImg',function(images){
    return getFirstImg(images);
})
getFirstImg = function(images){
    if(images && images.length > 0){
        return {image:images[0]};
    }
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
mapParentId = function(child){
    var ids = [];
    ids.push(child);
    var cate = categories.findOne({_id:child});
    if(cate){
        var parent = cate.parent;
        ids.push(parent);
         
    } 
    var newids = [];
    for(var i=ids.length ;i >= 0;i--){
        newids.push(ids[i]);
    }
    return newids;

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
getBannerCatById = function(id){
    var result = categories.findOne({_id:id});
    if(result && result.image && result.image!==null && result!=='undefine'){
        return result.image;
    }else return;
}
Template.registerHelper('checkImg',function(img){
    return checkImg(img);
})
checkImg = function(img){
    var result = images.findOne({_id:img});
    if(result){
        return true;
    }else{
        return false;
    }
}
Template.registerHelper('getPullRight',function(index){
    return getPullRight(index);
})
getPullRight = function(index){
    if(index / 2 !== 0){
        return 'pull-right';
    }else{
        return;
    }
}

Template.registerHelper('listSearch',function(){
    var keyword = Session.get('keyword');
    var limit = Session.get("items.list.limit");
    var offset = (Session.get("items.list.page") - 1) * limit; 
    Meteor.call('getListPostIdsBySearch',{skip: offset},keyword,Session.get('language'),function(err,data){
        if(!err){
            $('.search-dropdown').html(data);
        }
    });
})
Template.registerHelper('listSearchFront',function(){
    var keyword = Session.get('keyword');
    var limit = Session.get("items.list.limit");
    var offset = (Session.get("items.list.page") - 1) * limit; 
    Meteor.call('getListSearchFront',{skip: offset},keyword,Session.get('language'),function(err,data){
        if(!err){
            $('.search-dropdown').html(data);
        }
    });
})

slugUrl = function(title){
    title = title.replace(" ",'-');
    return title;
}

Template.registerHelper('slugUrl',function(title){
    return slugUrl(title);
})

Template.registerHelper('is4img',function(img){
    console.log('MyLength=='+img.length);
    if(img.length == 4){
        console.log('true');
        return true;
    }else{
        console.log('false');
        return false;
    }
})
Template.mainLayout.onRendered(function(){
   Tracker.autorun(function(){
    var language = Session.get('language');
        if(language == 'kh'){
            $('.container-fluid').css('font-family','khmer UI');
            $('.text-header').css('font-size','24px');
        }else{
            $('.container-fluid').css('font-family','"PT Sans Narrow", "Arial Narrow", Arial, Helvetica, sans-serif');
            $('.text-header').css('font-size','17px');
        }
    }) 
})
