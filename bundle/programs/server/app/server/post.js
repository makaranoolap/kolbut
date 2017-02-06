(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/post.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.methods({                                                       // 1
	addpost: function (obj) {                                             // 2
		post.insert(obj);                                                    // 3
	},                                                                    //
	editPost: function (id, obj) {                                        // 5
		post.update({ _id: id }, { $set: obj });                             // 6
	},                                                                    //
	removeFile: function (id) {                                           // 8
		this.unblock();                                                      // 9
		images.remove({ _id: id });                                          // 10
	},                                                                    //
	removeIdImgFromPost: function (id, idImg) {                           // 13
		this.unblock();                                                      // 14
		console.log('id==' + idImg);                                         // 15
		post.update({ _id: id }, { $pull: { images: idImg } });              // 16
	},                                                                    //
	updateImagePost: function (id, idImg) {                               // 18
		this.unblock();                                                      // 19
		post.update({ _id: id }, { $push: { images: idImg } });              // 20
	},                                                                    //
	removePost: function (id) {                                           // 22
		post.remove(id);                                                     // 23
	},                                                                    //
	addSlider: function (obj) {                                           // 25
		slider.insert(obj);                                                  // 26
	},                                                                    //
	updateSlider: function (id, obj) {                                    // 28
		slider.update({ _id: _id, id: id }, { $set: obj });                  // 29
	},                                                                    //
	updateImgSlider: function (id, image) {                               // 31
		this.unblock();                                                      // 32
		slider.update({ _id: id }, { $set: { images: image } });             // 33
	},                                                                    //
	removeIdImgSlider: function (id) {                                    // 35
		slider.update({ _id: id }, { $set: { images: '' } });                // 36
	},                                                                    //
	removeSlider: function (id) {                                         // 38
		slider.remove(id);                                                   // 39
	},                                                                    //
	updateImgBannerCat: function (id, image) {                            // 41
		this.unblock();                                                      // 42
		categories.update({ _id: id }, { $set: { image: image } });          // 43
	},                                                                    //
	numberRowPost: function (keyword, category) {                         // 45
		this.unblock();                                                      // 46
		return getPagListBySearchPost(keyword, category);                    // 47
	},                                                                    //
	getListPostIdsBySearch: function (options, keyword, language) {       // 49
		this.unblock();                                                      // 50
		var result = listPostByPageSearch(options, keyword);                 // 51
		if (result && result.count() > 0) {                                  // 52
			var html = '';                                                      // 53
			result.forEach(function (v) {                                       // 54
				switch (language) {                                                // 55
					case 'en':                                                        // 56
						html += '<li><a href="/postSearch/' + v.en.title + '">' + searchTextBold(v.en.title, keyword) + '</a></li>';
						break;                                                           // 58
					case 'kh':                                                        // 59
						html += '<li><a href="/postSearch/' + v.kh.title + '">' + searchTextBold(v.kh.title, keyword) + '</a></li>';
						break;                                                           // 61
					case 'ch':                                                        // 61
						html += '<li><a href="/postSearch/' + v.ch.title + '">' + searchTextBold(v.ch.title, keyword) + '</a></li>';
						break;                                                           // 64
				}                                                                  // 64
			});                                                                 //
			return html;                                                        // 67
		} else {                                                             //
			return;                                                             // 69
		}                                                                    //
	},                                                                    //
	getListSearchFront: function (options, keyword, language) {           // 72
		this.unblock();                                                      // 73
		var result = listPostByPageSearch(options, keyword);                 // 74
		if (result && result.count() > 0) {                                  // 75
			var html = '';                                                      // 76
			result.forEach(function (v) {                                       // 77
				switch (language) {                                                // 78
					case 'en':                                                        // 79
						html += '<li><a class="link-search" href="/search/' + v.en.title + '">' + searchTextBold(v.en.title, keyword) + '</a></li>';
						break;                                                           // 81
					case 'kh':                                                        // 82
						html += '<li><a class="link-search" href="/search/' + v.kh.title + '">' + searchTextBold(v.kh.title, keyword) + '</a></li>';
						break;                                                           // 84
					case 'ch':                                                        // 85
						html += '<li><a class="link-search" href="/search/' + v.ch.title + '">' + searchTextBold(v.ch.title, keyword) + '</a></li>';
						break;                                                           // 87
				}                                                                  // 87
			});                                                                 //
			return html;                                                        // 90
		} else {                                                             //
			return;                                                             // 92
		}                                                                    //
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
// lugUrl = function(title){                                           //
//     title = title.replace(" ",'-');                                 //
//     return title;                                                   //
// }                                                                   //
                                                                       //
searchTextBold = function (src_str, term) {                            // 103
	term = term.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");               // 104
	var pattern = new RegExp("(" + term + ")", "gi");                     // 105
	src_str = src_str.replace(pattern, "<mark>$1</mark>");                // 106
	src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");
	return src_str;                                                       // 108
};                                                                     //
                                                                       //
getPagListBySearchPost = function (keyword, categoryId) {              // 111
	var result = '';                                                      // 112
	if (keyword) {                                                        // 113
		var query = {                                                        // 114
			$or: [{ 'en.title': { $regex: new RegExp(keyword, "i") } }, { 'kh.title': { $regex: new RegExp(keyword, "i") } }, { 'ch.title': { $regex: new RegExp(keyword, "i") } }]
		};                                                                   //
		result = post.find({ $and: [{ location: 'product' }, query] });      // 121
		console.log('dataCount=' + result.count());                          // 122
	} else {                                                              //
		result = post.find({ location: 'product' });                         // 124
	}                                                                     //
	if (categoryId) {                                                     // 126
		var catIdArray = [];                                                 // 127
		catIdArray = mapChildId(categoryId);                                 // 128
		catIdArray.push(categoryId);                                         // 129
		console.log('categoryId=' + catIdArray);                             // 130
		var query = { $and: [{ location: 'product' }, { category: { $in: catIdArray } }] };
		result = post.find(query);                                           // 132
	}                                                                     //
	return result.count();                                                // 134
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=post.js.map
