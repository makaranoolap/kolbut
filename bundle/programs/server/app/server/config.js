(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/config.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
fullpath = process.env.PWD;                                            // 2
//console.log('linux path:'+fullpath);                                 //
if (typeof fullpath == 'undefined') {                                  // 4
  base_path = Meteor.npmRequire('fs').realpathSync(process.cwd() + '../../');
  //console.log('window path:'+base_path);                             //
  base_path = base_path.split('\\').join('/');                         // 7
  base_path = base_path.replace(/\/\.meteor.*$/, '');                  // 8
} else {                                                               //
  base_path = fullpath;                                                // 10
}                                                                      //
Router.map(function () {                                               // 12
  this.route('serverFile', {                                           // 13
    where: 'server',                                                   // 14
    path: /^\/uploads\/(.*)$/,                                         // 15
    action: function () {                                              // 16
      var filePath = base_path + '/upload/' + this.params;             // 17
      //console.log('path:'+filePath);                                 //
      try {                                                            // 19
        var data = fs.readFileSync(filePath);                          // 20
        this.response.writeHead(200, {                                 // 21
          'Content-Type': 'image'                                      // 22
        });                                                            //
        this.response.write(data);                                     // 24
        this.response.end();                                           // 25
      } catch (e) {                                                    //
        this.response.writeHead(404, {});                              // 28
        this.response.end();                                           // 31
      }                                                                //
    }                                                                  //
  });                                                                  //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 39
  baseUrl: function () {                                               // 40
    basePath = Meteor.absoluteUrl.defaultOptions.rootUrl;              // 41
    return basePath;                                                   // 42
  },                                                                   //
  basePath: function () {                                              // 44
    var base_path = Meteor.npmRequire('fs').realpathSync(process.cwd() + '../../');
    base_path = base_path.split('\\').join('/');                       // 46
    baseDir = base_path.replace(/\/\.meteor.*$/, '');                  // 47
    return baseDir;                                                    // 48
  }                                                                    //
});                                                                    //
images.allow({                                                         // 51
  'insert': function () {                                              // 52
    // add custom authentication code here                             //
    return true;                                                       // 54
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=config.js.map
