Meteor.methods({
	addpost:function(obj){
		post.insert(obj);
	},
	editPost:function(id,obj){
		post.update({_id:id},{$set:obj});
	},
	removeFile:function(id){
		this.unblock();
		images.remove({_id:id});
		
	},
	removeIdImgFromPost:function(id,idImg){
		this.unblock();
		console.log('id=='+idImg);
		post.update({_id:id},{$pull:{images:idImg}});
	},
	updateImagePost:function(id,idImg){
		this.unblock();
		post.update({_id:id},{$push:{images:idImg}})
	},
	removePost:function(id){
		post.remove(id);
	},
	addSlider:function(obj){
		slider.insert(obj);
	},
	updateSlider:function(id,obj){
		slider.update({_id,id},{$set:obj})
	},
	updateImgSlider:function(id,image){
		this.unblock();
		slider.update({_id:id},{$set:{images:image}})
	},
	removeIdImgSlider:function(id){
		slider.update({_id:id},{$set:{images:''}});
	},
	removeSlider:function(id){
		slider.remove(id);
	},
	updateImgBannerCat:function(id,image){
		this.unblock();
		categories.update({_id:id},{$set:{image:image}})
	},
	numberRowPost:function(keyword,category){
		this.unblock();
	    return getPagListBySearchPost(keyword,category);
	},
	getListPostIdsBySearch:function(options,keyword,language){
	    this.unblock();
	    var result = listPostByPageSearch(options,keyword);
	    if(result && result.count() > 0){
		  var html = '';
	      result.forEach(function(v){
	      	switch(language){
	      		case 'en':
	      			html+='<li><a href="/postSearch/'+v.en.title+'">'+searchTextBold(v.en.title,keyword)+'</a></li>';
	      			break;
	      		case 'kh':
	      			html+='<li><a href="/postSearch/'+v.kh.title+'">'+searchTextBold(v.kh.title,keyword)+'</a></li>';
	      			break;
	      		case 'ch':
	      			html+='<li><a href="/postSearch/'+v.ch.title+'">'+searchTextBold(v.ch.title,keyword)+'</a></li>';
	      			break;
	      	} 
	      })
	      return html;
	    }else{
	    	return;
	    }
  	},
  	getListSearchFront:function(options,keyword,language){
	    this.unblock();
	    var result = listPostByPageSearch(options,keyword);
	    if(result && result.count() > 0){
		  var html = '';
	      result.forEach(function(v){
	      	switch(language){
	      		case 'en':
	      			html+='<li><a class="link-search" href="/search/'+v.en.title+'">'+searchTextBold(v.en.title,keyword)+'</a></li>';
	      			break;
	      		case 'kh':
	      			html+='<li><a class="link-search" href="/search/'+v.kh.title+'">'+searchTextBold(v.kh.title,keyword)+'</a></li>';
	      			break;
	      		case 'ch':
	      			html+='<li><a class="link-search" href="/search/'+v.ch.title+'">'+searchTextBold(v.ch.title,keyword)+'</a></li>';
	      			break;
	      	} 
	      })
	      return html;
	    }else{
	    	return;
	    }
  	}

})

// lugUrl = function(title){
//     title = title.replace(" ",'-');
//     return title;
// }

searchTextBold = function(src_str,term){
    term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
    var pattern = new RegExp("("+term+")", "gi");
    src_str = src_str.replace(pattern, "<mark>$1</mark>");
    src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
    return src_str;
}

getPagListBySearchPost = function(keyword,categoryId){
	var result= '';
	if(keyword){
	    var query = {
	        $or:[
	            {'en.title' : {$regex : new RegExp(keyword, "i")}},
	            {'kh.title' : {$regex : new RegExp(keyword, "i")}},
	            {'ch.title' : {$regex : new RegExp(keyword, "i")}}
	            ]    
	    }
	    result = post.find({$and:[{location:'product'},query]}); 
	    console.log('dataCount='+result.count());
	}else{
		result = post.find({location:'product'});
	}
	if(categoryId){
		var catIdArray =[];
	    catIdArray = mapChildId(categoryId);
	    catIdArray.push(categoryId);
	    console.log('categoryId='+catIdArray);
	    var query = {$and:[{location:'product'},{category:{$in:catIdArray}}]}
	    result = post.find(query);
	}
	return result.count();
}