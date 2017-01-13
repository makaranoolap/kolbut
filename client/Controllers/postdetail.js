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

Template.details.helpers({
	getRelated:function(cate,id){
		var parent = findParent(cate);
		var arrayId = mapChildId(parent);
		var posts = post.find({category:{$in:arrayId}});
		var arrayRandom = [];
		posts.forEach(function(v){
			if(v._id !== id){
				arrayRandom.push(v._id);
			}	
		});
		var new_array = getUnique(4,arrayRandom);
		return post.find({_id:{$in:new_array}});
	}
})


 
