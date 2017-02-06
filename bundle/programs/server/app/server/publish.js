(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//=====gobal function server=======                                    //
listUserByPage = function (options, lang) {                            // 2
    var opt = {                                                        // 3
        limit: 10                                                      // 4
    };                                                                 //
    if (options) {                                                     // 6
        if (Number(options.skip) > 0) {                                // 7
            opt.skip = Number(options.skip);                           // 8
        }                                                              //
    }                                                                  //
    return Meteor.users.find({}, opt);                                 // 11
};                                                                     //
                                                                       //
listPostByPage = function (options, page) {                            // 14
    var query = {};                                                    // 15
    if (page) {                                                        // 16
        var query = { location: page };                                // 17
    }                                                                  //
                                                                       //
    var opt = {                                                        // 20
        limit: 10                                                      // 21
    };                                                                 //
    if (options) {                                                     // 23
        if (Number(options.skip) > 0) {                                // 24
            opt.skip = Number(options.skip);                           // 25
        }                                                              //
    }                                                                  //
                                                                       //
    return post.find(query, opt);                                      // 29
};                                                                     //
Meteor.publish('pages', function (location) {                          // 31
    return post.find({ location: location });                          // 32
});                                                                    //
                                                                       //
Meteor.publish('listProductByPageFront', function (page) {             // 35
    return listProductByPageFront(page);                               // 36
});                                                                    //
listProductByPageFront = function (page) {                             // 38
    var query = { location: 'product' };                               // 39
    var sort = { sort: { date_created: -1 } };                         // 40
    var result = post.find(query, sort);                               // 41
    var post_array = result.fetch();                                   // 42
    var arrayId = createPagByArrayId(page, post_array);                // 43
    return post.find({ _id: { $in: arrayId } });                       // 44
};                                                                     //
                                                                       //
createPagByArrayId = function (page, resultArray) {                    // 48
    var arrayId = [];                                                  // 49
    var i = 0;                                                         // 50
    var limit = 12;                                                    // 51
    var offset = page - 1;                                             // 52
    var i = limit * offset;                                            // 53
    var n = limit * page;                                              // 54
    if (resultArray.length > 0 && i <= resultArray.length) {           // 55
        for (i; i < n; i++) {                                          // 56
            if (resultArray[i]) {                                      // 57
                arrayId.push(resultArray[i]._id);                      // 58
            }                                                          //
        }                                                              //
    }                                                                  //
    return arrayId;                                                    // 63
};                                                                     //
                                                                       //
searchUsers = function (keyword, limit) {                              // 66
    if (keyword) {                                                     // 67
        var result = Meteor.users.find({ $or: [{ 'profile.username': { $regex: new RegExp(keyword, "i") } }, { 'profile.firstname': { $regex: new RegExp(keyword, "i") } }, { 'profile.lastname': { $regex: new RegExp(keyword, "i") } }] }, { limit: limit });
        return result;                                                 // 69
    } else return;                                                     //
};                                                                     //
                                                                       //
listUserByPageSearch = function (options, keyword) {                   // 73
    var query = { 'profile.username': { $regex: new RegExp(keyword, "i") } };
    var opt = {                                                        // 75
        limit: 10                                                      // 76
    };                                                                 //
    if (options) {                                                     // 78
        if (Number(options.skip) > 0) {                                // 79
            opt.skip = Number(options.skip);                           // 80
        }                                                              //
    }                                                                  //
    var result = Meteor.users.find(query, opt);                        // 83
    return result;                                                     // 84
};                                                                     //
                                                                       //
listPostByPageSearch = function (options, keyword) {                   // 87
    var query = {                                                      // 88
        $or: [{ 'en.title': { $regex: new RegExp(keyword, "i") } }, { 'kh.title': { $regex: new RegExp(keyword, "i") } }, { 'ch.title': { $regex: new RegExp(keyword, "i") } }]
    };                                                                 //
    var opt = {                                                        // 95
        limit: 12                                                      // 96
    };                                                                 //
    if (options) {                                                     // 98
        if (Number(options.skip) > 0) {                                // 99
            opt.skip = Number(options.skip);                           // 100
        }                                                              //
    }                                                                  //
    var result = post.find(query, opt);                                // 103
    if (!keyword) {                                                    // 104
        result = '';                                                   // 105
    }                                                                  //
    return result;                                                     // 107
};                                                                     //
                                                                       //
mapChildId = function (parentId) {                                     // 110
    var attrId = [];                                                   // 111
    attrId.push(parentId);                                             // 112
    var cate = categories.find({ parent: parentId });                  // 113
    if (cate.count() > 0) {                                            // 114
        cate.forEach(function (v) {                                    // 115
            var result = categories.findOne({ parent: v._id });        // 116
            if (result) {                                              // 117
                return mapChildId(v._id);                              // 118
            } else {                                                   //
                attrId.push(v._id);                                    // 120
            }                                                          //
        });                                                            //
    }                                                                  //
                                                                       //
    return attrId;                                                     // 125
};                                                                     //
findParent = function (child) {                                        // 127
    var cate = categories.findOne({ _id: child });                     // 128
    if (cate) {                                                        // 129
        var parent = cate.parent;                                      // 130
        if (parent == '0') {                                           // 131
            return cate._id;                                           // 132
        } else {                                                       //
            return findParent(parent);                                 // 134
        }                                                              //
    }                                                                  //
};                                                                     //
getUnique = function (count, arrayNum) {                               // 139
    // Make a copy of the array                                        //
    var tmp = arrayNum.slice(arrayNum);                                // 141
    var ret = [];                                                      // 142
                                                                       //
    for (var i = 0; i < count; i++) {                                  // 144
        var index = Math.floor(Math.random() * tmp.length);            // 145
        var removed = tmp.splice(index, 1);                            // 146
        // Since we are only removing one element                      //
        ret.push(removed[0]);                                          // 148
    }                                                                  //
    return ret;                                                        // 150
};                                                                     //
//=====end gobal function server===                                    //
Meteor.publish('servicedetais', function (slug, lang) {                // 153
    var result = '';                                                   // 154
    switch (lang) {                                                    // 155
        case 'en':                                                     // 156
            result = post.find({ 'en.title': slug });                  // 157
        case 'kh':                                                     // 158
            result = post.find({ 'kh.title': slug });                  // 159
        case 'ch':                                                     // 159
            result = post.find({ 'ch.title': slug });                  // 161
    }                                                                  // 161
    return result;                                                     // 163
});                                                                    //
Meteor.publish('details', function (id) {                              // 165
    var new_array = [];                                                // 166
    var p = post.findOne({ _id: id });                                 // 167
    if (p) {                                                           // 168
        var parent = findParent(p.category);                           // 169
        var arrayId = mapChildId(parent);                              // 170
        console.log('Helo=' + arrayId);                                // 171
        var posts = post.find({ category: { $in: arrayId } });         // 172
        var arrayRandom = [];                                          // 173
        posts.forEach(function (v) {                                   // 174
            if (v._id !== id) {                                        // 175
                arrayRandom.push(v._id);                               // 176
            }                                                          //
        });                                                            //
        new_array = getUnique(4, arrayRandom);                         // 179
        new_array.push(p._id);                                         // 180
        var result = post.find({ _id: { $in: new_array } });           // 181
        console.log('DATA==' + result.count());                        // 182
        return result;                                                 // 183
    }                                                                  //
});                                                                    //
                                                                       //
Meteor.publish('userPageList', function (options) {                    // 188
    var user = listUserByPage(options);                                // 189
    return user;                                                       // 190
});                                                                    //
Meteor.publish('PostPageList', function (options, page) {              // 193
    var posts = listPostByPage(options, page);                         // 194
    return posts;                                                      // 195
});                                                                    //
Meteor.publish('PageListProduct', function (options, lang) {           // 198
    var posts = listPostByPageFront(options, lang);                    // 199
    return posts;                                                      // 200
});                                                                    //
                                                                       //
//====Start Search====                                                 //
Meteor.publish('searchUsers', function (keyword, limit) {              // 206
    var result = searchUsers(keyword, limit);                          // 207
    console.log('User==' + result.count());                            // 208
    return result;                                                     // 209
});                                                                    //
                                                                       //
Meteor.publish('listUserByPageSearch', function (options, keyword) {   // 212
    return listUserByPageSearch(options, keyword);                     // 213
});                                                                    //
Meteor.publish('listPostByPageSearch', function (options, keyword) {   // 215
    return listPostByPageSearch(options, keyword);                     // 216
});                                                                    //
//====End Search=====                                                  //
                                                                       //
Meteor.publish('images', function () {                                 // 221
    return images.find();                                              // 222
});                                                                    //
                                                                       //
Meteor.publish("post", function (lang) {                               // 225
    var result = '';                                                   // 226
    switch (lang) {                                                    // 227
        case 'en':                                                     // 228
            result = post.find({}, { fields: { '_id': 1, 'en': 1, 'images': 1, 'category': 1, 'location': 1, 'code': 1 } });
            break;                                                     // 230
        case 'kh':                                                     // 230
            result = post.find({}, { fields: { '_id': 1, 'kh': 1, 'images': 1, 'category': 1, 'location': 1, 'code': 1 } });
            break;                                                     // 233
        case 'ch':                                                     // 233
            result = post.find({}, { fields: { '_id': 1, 'ch': 1, 'images': 1, 'category': 1, 'location': 1, 'code': 1 } });
            break;                                                     // 236
    }                                                                  // 236
    return result;                                                     // 238
});                                                                    //
Meteor.publish("listpostFront", function () {                          // 240
    var result = post.find({ location: 'product' }, { sort: { date_created: -1 }, limit: 12 });
    return result;                                                     // 242
});                                                                    //
Meteor.publish('getPostToEdit', function (id) {                        // 244
    return post.find({ _id: id });                                     // 245
});                                                                    //
                                                                       //
Meteor.publish('categories', function (lang) {                         // 248
    return categories.find();                                          // 249
});                                                                    //
Meteor.publish('slider', function (lang) {                             // 251
    var result = '';                                                   // 252
    switch (lang) {                                                    // 253
        case 'en':                                                     // 254
            result = slider.find({}, { fields: { '_id': 1, 'en': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 256
        case 'kh':                                                     // 257
            result = slider.find({}, { fields: { '_id': 1, 'kh': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 259
        case 'ch':                                                     // 259
            result = slider.find({}, { fields: { '_id': 1, 'ch': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 262
    }                                                                  // 262
    return result;                                                     // 264
});                                                                    //
Meteor.publish('getSliderById', function (id) {                        // 266
    return slider.find({ _id: id });                                   // 267
});                                                                    //
                                                                       //
Meteor.publish("getService", function (lang) {                         // 270
    var result = '';                                                   // 271
    switch (lang) {                                                    // 272
        case 'en':                                                     // 273
            result = post.find({ location: 'service' }, { fields: { '_id': 1, 'en': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 275
        case 'kh':                                                     // 275
            result = post.find({ location: 'service' }, { fields: { '_id': 1, 'kh': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 278
        case 'ch':                                                     // 279
            result = post.find({ location: 'service' }, { fields: { '_id': 1, 'ch': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 281
    }                                                                  // 281
    return result;                                                     // 283
});                                                                    //
Meteor.publish("getNews", function (lang) {                            // 285
    var result = '';                                                   // 286
    switch (lang) {                                                    // 287
        case 'en':                                                     // 288
            result = post.find({ location: 'news' }, { fields: { '_id': 1, 'en': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 290
        case 'kh':                                                     // 291
            result = post.find({ location: 'news' }, { fields: { '_id': 1, 'kh': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 293
        case 'ch':                                                     // 294
            result = post.find({ location: 'news' }, { fields: { '_id': 1, 'ch': 1, 'images': 1, 'location': 1 } });
            break;                                                     // 296
    }                                                                  // 296
    return result;                                                     // 298
});                                                                    //
Meteor.publish('listProductByCategory', function (categoryId, page) {  // 300
    var catIdArray = [];                                               // 301
    catIdArray = mapChildId(categoryId);                               // 302
    catIdArray.push(categoryId);                                       // 303
    var query = { $and: [{ location: 'product' }, { category: { $in: catIdArray } }] };
    var sort = { sort: { date_created: -1 } };                         // 305
    var result = post.find(query, sort);                               // 306
    var post_array = result.fetch();                                   // 307
    var arrayId = createPagByArrayId(page, post_array);                // 308
    return post.find({ _id: { $in: arrayId } });                       // 309
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publish.js.map
