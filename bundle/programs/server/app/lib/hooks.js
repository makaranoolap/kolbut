(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/hooks.js                                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var IR_BeforeHooks = {                                                 // 1
    isLogin: function () {                                             // 2
        var currentRoute = Iron.Location.get().path;                   // 3
        if (Meteor.userId() && currentRoute == '/login') {             // 4
            Router.go('/');                                            // 5
            this.render('newHome');                                    // 6
            pause();                                                   // 7
        } else {                                                       //
            this.next();                                               // 9
        }                                                              //
    },                                                                 //
    isAdmin: function () {                                             // 12
        if (!Meteor.userId()) {                                        // 13
            Router.go('/login');                                       // 14
            this.next();                                               // 15
        } else if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'mygroup')) {
            //Router.go('/notfound');                                  //
            //this.next();                                             //
            this.render('notfound');                                   // 20
            pause();                                                   // 21
        } else {                                                       //
            this.next();                                               // 23
        }                                                              //
    },                                                                 //
    isAdminOrMember: function () {                                     // 26
        if (!Meteor.userId()) {                                        // 27
            // this.render('login');                                   //
            Router.go('/login');                                       // 29
            this.next();                                               // 30
        } else if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'member'], 'mygroup')) {
            //Router.go('/notfound');                                  //
            //this.next();                                             //
            this.render('notfound');                                   // 35
            pause();                                                   // 36
        } else {                                                       //
            this.next();                                               // 38
        }                                                              //
    },                                                                 //
    checkoutNotLogin: function () {                                    // 41
        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'member'], 'mygroup')) {
            this.render('login');                                      // 43
        } else {                                                       //
            this.next();                                               // 46
        }                                                              //
    },                                                                 //
    trackingRouter: function () {                                      // 49
        if (Meteor.isClient) {                                         // 50
            if (Meteor.userId() != null) userId = Meteor.userId();else userId = Session.get('userId');
            var time = Date.now();                                     // 55
            var currenturl = window.location.href;                     // 56
            Meteor.call('trackingRouter', userId, time, currenturl);   // 57
            //this.next();                                             //
        }                                                              //
    },                                                                 //
    pageView: function () {                                            // 61
        if (Meteor.isClient) {                                         // 62
            var admin_url = Router.current().url;                      // 63
            var result = admin_url.split('/')[1];                      // 64
            if (result == "") result = "home";                         // 65
            var url = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-71059459-2&cid=555&dh=' + admin_url + '&dp=%2F' + result + '&dt=' + result + 'page';
            Meteor.call('eventCall', url, function (error, result) {   // 68
                if (error) {                                           // 69
                    console.log('Analytic CLIENT ERRR');               // 70
                    console.log(error);                                // 71
                } else {                                               //
                    console.log('Analytic CLIENT RESULT');             // 73
                    console.log(result);                               // 74
                }                                                      //
            });                                                        //
        }                                                              //
        this.next();                                                   // 79
    }                                                                  //
                                                                       //
};                                                                     //
                                                                       //
var routerNameLogin = ['login'];                                       // 84
                                                                       //
var routerNameAdmin = ['managerole', 'userlist', 'managepost', 'homeadmin', 'addpost', 'category', 'managecategory', 'manageslider', 'addslider'];
var routerNameMember = ['profile', 'editprofile', 'reward', 'member', 'dailyPopup', 'confirmorder', 'confirmorder1', 'confirmorder2', 'payment', 'afterregisterStepOne', 'afterregisterStepTwo', 'afterregisterStepThree', 'afterregisterStepFour', 'afterregisterStepFive'];
var routerCheckout = ['checkout'];                                     // 118
var routerLogin = ['login'];                                           // 119
//Router.before(IR_BeforeHooks.pageView);                              //
Router.before(IR_BeforeHooks.isAdmin, { only: routerNameAdmin });      // 121
Router.before(IR_BeforeHooks.isAdminOrMember, { only: routerNameMember }); //for member
//Router.onAfterAction(IR_BeforeHooks.trackingRouter);                 //
//Router.onBeforeAction(IR_BeforeHooks.checkLogin, {only: routerLogin});
// Router.onAfterAction(IR_BeforeHooks.sitemap);                       //
//Router.onAfterAction(IR_BeforeHooks.updateMembershipId);             //
                                                                       //
//Router.onBeforeAction(IR_BeforeHooks.MySubscription);                //
//Router.onBeforeAction(IR_BeforeHooks.checkoutNotLogin,{only:routerCheckout});
Router.before(IR_BeforeHooks.isLogin, { only: routerNameLogin });      // 131
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=hooks.js.map
