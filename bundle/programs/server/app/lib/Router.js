(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/Router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
    layoutTemplate: 'mainLayout',                                      // 2
    loadingTemplate: 'loading'                                         // 3
});                                                                    //
                                                                       //
Router.route('/', {                                                    // 6
    name: 'home',                                                      // 7
    waitOn: function () {                                              // 8
        return Meteor.subscribe('pages', 'home');                      // 9
    },                                                                 //
    data: function () {                                                // 11
        var result = post.find({ location: 'home' }, { sort: { order: 1 } });
        return { home: result };                                       // 13
    }                                                                  //
});                                                                    //
                                                                       //
Router.route('/login', {                                               // 17
    layoutTemplate: 'layoutlogin',                                     // 18
    name: 'login'                                                      // 19
});                                                                    //
// register                                                            //
Router.route('register', {                                             // 22
    name: 'register'                                                   // 23
});                                                                    //
Router.route('loading', {                                              // 25
    name: 'loading'                                                    // 26
});                                                                    //
                                                                       //
//mange Role userrs                                                    //
Router.route('/managerole', {                                          // 31
    layoutTemplate: 'mainAdmin',                                       // 32
    name: 'manageRole'                                                 // 33
});                                                                    //
Router.route('/updateuser/:id', {                                      // 35
    name: 'updateuser',                                                // 36
    data: function () {                                                // 37
        return Meteor.users.findOne({ _id: this.params.id });          // 38
    }                                                                  //
                                                                       //
});                                                                    //
Router.route('/userlist', {                                            // 42
    name: 'userlist'                                                   // 43
});                                                                    //
Router.route('/users/page/:num', {                                     // 45
    template: 'manageRole',                                            // 46
    data: function () {                                                // 47
        if (this.ready) {                                              // 48
            Session.set("items.list.page", Number(this.params.num));   // 49
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/about', {                                               // 54
    name: 'about',                                                     // 55
    waitOn: function () {                                              // 56
        return Meteor.subscribe('pages', 'about');                     // 57
    },                                                                 //
    data: function () {                                                // 59
        var result = post.find({ location: 'about' }, { sort: { order: 1 } });
        return { about: result };                                      // 61
    }                                                                  //
});                                                                    //
Router.route('/usersearch/:keyword', {                                 // 64
    name: 'usersearch',                                                // 65
    data: function () {                                                // 66
        var keyword = this.params.keyword;                             // 67
        Session.set('keyword', keyword);                               // 68
    }                                                                  //
});                                                                    //
Router.route('/searchpagination/:keyword/:num', {                      // 71
    name: 'searchpagination',                                          // 72
    data: function () {                                                // 73
        var keyword = this.params.keyword;                             // 74
        Session.set('keyword', keyword);                               // 75
        Session.set("items.list.page", Number(this.params.num));       // 76
    }                                                                  //
});                                                                    //
Router.route('/uploadfile', {                                          // 79
    name: 'uploadfile'                                                 // 80
});                                                                    //
Router.route('/homeadmin', {                                           // 82
    layoutTemplate: 'mainAdmin',                                       // 83
    name: 'homeadmin'                                                  // 84
});                                                                    //
Router.route('/managepost', {                                          // 86
    layoutTemplate: 'mainAdmin',                                       // 87
    name: 'managepost',                                                // 88
    waitOn: function () {                                              // 89
        var page = Session.get('page');                                // 90
        return Meteor.subscribe("PostPageList", { skip: 0 }, page);    // 91
    },                                                                 //
    data: function () {                                                // 93
        if (this.ready) {                                              // 94
            Session.set('items.list.page', 1);                         // 95
            var result = post.find();                                  // 96
            return { getPost: result };                                // 97
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/postSearch/:keyword', {                                 // 102
    template: 'managepost',                                            // 103
    layoutTemplate: 'mainAdmin',                                       // 104
    waitOn: function () {                                              // 105
        var keyword = this.params.keyword;                             // 106
        if (Session.set('keyword')) {                                  // 107
            keyword = Session.set('keyword');                          // 108
        }                                                              //
        var limit = Session.get("items.list.limit");                   // 110
        console.log('LIMIT==' + limit);                                // 111
        var offset = (Session.get("items.list.page") - 1) * limit;     // 112
        return [Meteor.subscribe('listPostByPageSearch', { skip: offset }, keyword)];
    },                                                                 //
    data: function () {                                                // 115
        //Session.set('postIDs','');                                   //
        if (this.ready) {                                              // 117
            return { getPost: post.find() };                           // 118
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/post/page/:num', {                                      // 122
    template: 'managepost',                                            // 123
    layoutTemplate: 'mainAdmin',                                       // 124
    waitOn: function () {                                              // 125
        Tracker.autorun(function () {                                  // 126
            var limit = Session.get("items.list.limit");               // 127
            var offset = (Session.get("items.list.page") - 1) * limit;
            return [Meteor.subscribe("PostPageList", { skip: offset })];
        });                                                            //
    },                                                                 //
    data: function () {                                                // 132
        if (this.ready) {                                              // 133
            Session.set("items.list.page", Number(this.params.num));   // 134
            var result = post.find();                                  // 135
            return { getPost: result };                                // 136
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/addpost', {                                             // 140
    layoutTemplate: 'mainAdmin',                                       // 141
    name: 'addpost'                                                    // 142
});                                                                    //
Router.route('/editpost/:id', {                                        // 144
    layoutTemplate: 'mainAdmin',                                       // 145
    template: 'addpost',                                               // 146
    waitOn: function () {                                              // 147
        return [Meteor.subscribe('getPostToEdit', this.params.id)];    // 148
    },                                                                 //
    data: function () {                                                // 150
        if (this.ready) {                                              // 151
            var result = post.findOne({ _id: this.params.id });        // 152
            Session.set('date_update', result.date_created * 1000);    // 153
            return result;                                             // 154
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/category', {                                            // 158
    layoutTemplate: 'mainAdmin',                                       // 159
    name: 'category'                                                   // 160
});                                                                    //
Router.route('/editcategory/:id', {                                    // 162
    layoutTemplate: 'mainAdmin',                                       // 163
    template: 'category',                                              // 164
    data: function () {                                                // 165
        return categories.findOne({ _id: this.params.id });            // 166
    }                                                                  //
});                                                                    //
Router.route('/managecategory', {                                      // 169
    layoutTemplate: 'mainAdmin',                                       // 170
    name: 'managecategory'                                             // 171
});                                                                    //
Router.route('/manageslider', {                                        // 173
    layoutTemplate: 'mainAdmin',                                       // 174
    name: 'manageslider'                                               // 175
});                                                                    //
Router.route('/addslider', {                                           // 177
    layoutTemplate: 'mainAdmin',                                       // 178
    name: 'addslider'                                                  // 179
});                                                                    //
Router.route('/editslider/:id', {                                      // 181
    layoutTemplate: 'mainAdmin',                                       // 182
    template: 'addslider',                                             // 183
    waitOn: function () {                                              // 184
        return Meteor.subscribe('getSliderById', this.params.id);      // 185
    },                                                                 //
    data: function () {                                                // 187
        return slider.findOne({ _id: this.params.id });                // 188
    }                                                                  //
});                                                                    //
Router.route('/listproduct/category/:id.html', {                       // 191
    name: 'listproduct',                                               // 192
    waitOn: function () {                                              // 193
        var page = 1;                                                  // 194
        return [Meteor.subscribe('listProductByCategory', this.params.id, page)];
    },                                                                 //
    data: function () {                                                // 197
        var catIdArray = [];                                           // 198
        catIdArray = mapChildId(this.params.id);                       // 199
        catIdArray.push(this.params.id);                               // 200
        var result = post.find({ category: { $in: catIdArray } });     // 201
        Session.set('categoryId', this.params.id);                     // 202
        return { listPost: result, banner: getBannerCatById(this.params.id) };
    }                                                                  //
});                                                                    //
Router.route('/listproduct/category/:id/page/:page', {                 // 206
    template: 'listproduct',                                           // 207
    waitOn: function () {                                              // 208
        var page = this.params.page;                                   // 209
        return [Meteor.subscribe('listProductByCategory', this.params.id, page)];
    },                                                                 //
    data: function () {                                                // 212
        Session.set("items.list.page", Number(this.params.page));      // 213
        var catIdArray = [];                                           // 214
        catIdArray = mapChildId(this.params.id);                       // 215
        catIdArray.push(this.params.id);                               // 216
        var result = post.find({ category: { $in: catIdArray } });     // 217
        Session.set('categoryId', this.params.id);                     // 218
        return { listPost: result, banner: getBannerCatById(this.params.id) };
    }                                                                  //
});                                                                    //
Router.route('/listproduct/page/:num', {                               // 222
    template: 'listproduct',                                           // 223
    waitOn: function () {                                              // 224
        var page = this.params.num;                                    // 225
        Tracker.autorun(function () {                                  // 226
            // var limit = Session.get("items.list.limit");            //
            // var offset = (Session.get("items.list.page") - 1) * limit;
            return [Meteor.subscribe("listProductByPageFront", page)];
        });                                                            //
    },                                                                 //
    data: function () {                                                // 232
        if (this.ready) {                                              // 233
            Session.set("items.list.page", Number(this.params.num));   // 234
            Session.set('keyword', '');                                // 235
            Session.set('categoryId', '');                             // 236
            var result = post.find();                                  // 237
            return { listPost: result };                               // 238
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/search/:keyword', {                                     // 242
    template: 'listproduct',                                           // 243
    waitOn: function () {                                              // 244
        var keyword = this.params.keyword;                             // 245
        if (Session.get('keyword')) {                                  // 246
            keyword = Session.get('keyword');                          // 247
        }                                                              //
        var limit = Session.get("items.list.limit");                   // 249
        var offset = (Session.get("items.list.page") - 1) * limit;     // 250
        return [Meteor.subscribe('listPostByPageSearch', { skip: offset }, keyword)];
    },                                                                 //
    data: function () {                                                // 253
        if (this.ready) {                                              // 254
            Session.set('keyword', this.params.keyword);               // 255
            Session.set('categoryId', '');                             // 256
            return { listPost: post.find() };                          // 257
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/search/keyword/:keyword/page/:num', {                   // 261
    template: 'listproduct',                                           // 262
    waitOn: function () {                                              // 263
        var keyword = this.params.keyword;                             // 264
        var num = this.params.num;                                     // 265
        if (Session.get('keyword')) {                                  // 266
            keyword = Session.get('keyword');                          // 267
        }                                                              //
        var limit = 12;                                                // 269
        var offset = (num - 1) * limit;                                // 270
        return [Meteor.subscribe('listPostByPageSearch', { skip: offset }, keyword)];
    },                                                                 //
    data: function () {                                                // 273
        if (this.ready) {                                              // 274
            Session.set('keyword', this.params.keyword);               // 275
            Session.set('categoryId', '');                             // 276
            return { listPost: post.find() };                          // 277
        }                                                              //
    }                                                                  //
});                                                                    //
Router.route('/listproduct.html', {                                    // 281
    template: 'listproduct',                                           // 282
    waitOn: function () {                                              // 283
        return [Meteor.subscribe('listpostFront')];                    // 284
    },                                                                 //
    data: function () {                                                // 286
        Session.set('items.list.page', 1);                             // 287
        Session.set('keyword', '');                                    // 288
        Session.set('categoryId', '');                                 // 289
        return { listPost: post.find() };                              // 290
    }                                                                  //
});                                                                    //
                                                                       //
Router.route('/details/:id.html', {                                    // 294
    name: 'details',                                                   // 295
    waitOn: function () {                                              // 296
        return [Meteor.subscribe('details', this.params.id)];          // 297
    },                                                                 //
    data: function () {                                                // 299
        return post.findOne({ _id: this.params.id });                  // 300
    }                                                                  //
});                                                                    //
Router.route('/service', {                                             // 303
    name: 'service',                                                   // 304
    data: function () {                                                // 305
        var result = post.find({ location: 'service' });               // 306
        return { getService: result };                                 // 307
    }                                                                  //
});                                                                    //
Router.route('/service-details/:slug', {                               // 310
    name: 'servicedetails',                                            // 311
    waitOn: function () {                                              // 312
        Meteor.subscribe('servicedetais', this.params.slug, Session.get('language'));
    },                                                                 //
    data: function () {                                                // 315
        return { result: post.find() };                                // 316
    }                                                                  //
});                                                                    //
Router.route('/newsEvent', {                                           // 319
    name: 'newsEvent',                                                 // 320
    data: function () {                                                // 321
        var result = post.find({ location: 'news' });                  // 322
        return { getNews: result };                                    // 323
    }                                                                  //
});                                                                    //
Router.route('/contact', {                                             // 326
    name: 'contact'                                                    // 327
});                                                                    //
Router.route('/project', {                                             // 329
    template: 'newsEvent',                                             // 330
    data: function () {                                                // 331
        var result = post.find({ location: 'news' });                  // 332
        return { getNews: result };                                    // 333
    }                                                                  //
});                                                                    //
Router.route('/partner', {                                             // 336
    name: 'partner',                                                   // 337
    waitOn: function () {                                              // 338
        Meteor.subscribe('pages', 'partner');                          // 339
    },                                                                 //
    data: function () {                                                // 341
        if (this.ready) {                                              // 342
            return post.findOne({ 'location': 'partner' });            // 343
        }                                                              //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=Router.js.map
