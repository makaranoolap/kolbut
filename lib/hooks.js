var IR_BeforeHooks = {
    isLogin: function(){
        var currentRoute = Iron.Location.get().path;
        if(Meteor.userId() && currentRoute == '/login'){
            Router.go('/');
            this.render('newHome');
            pause();
        }else {
            this.next();
        }
    },
    isAdmin: function() {
        if( ! Meteor.userId() ){
            Router.go('/login');
            this.next()
        }
        else if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'mygroup')) {
            //Router.go('/notfound');
            //this.next();
            this.render('notfound');
            pause();
        } else {
            this.next();
        }
    },
    isAdminOrMember: function() {
        if( ! Meteor.userId() ){
            // this.render('login');
            Router.go('/login');
            this.next();
        }
        else if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'member'], 'mygroup')) {
            //Router.go('/notfound');
            //this.next();
            this.render('notfound');
            pause();
        } else {
            this.next();
        }
    },
    checkoutNotLogin: function() {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'member'], 'mygroup')) {
            this.render('login');
            
        } else {
            this.next();
        }
    },
    trackingRouter: function() {
        if (Meteor.isClient) {
            if (Meteor.userId() != null)
                userId = Meteor.userId();
            else
                userId = Session.get('userId');
            var time = Date.now();
            var currenturl = window.location.href;
            Meteor.call('trackingRouter', userId, time, currenturl);
            //this.next();
        }
    },
    pageView: function() {
        if (Meteor.isClient) {
            var admin_url = Router.current().url;
            var result = admin_url.split('/')[1];
            if (result=="")
                result = "home";
            var url = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-71059459-2&cid=555&dh=' + admin_url + '&dp=%2F' + result + '&dt=' + result + 'page';
            Meteor.call('eventCall', url, function(error, result) {
                if (error) {
                    console.log('Analytic CLIENT ERRR');
                    console.log(error);
                } else {
                    console.log('Analytic CLIENT RESULT');
                    console.log(result);
                }
            });
            
        }
        this.next();
    }

};

var routerNameLogin = [
    'login'
];

var routerNameAdmin = [
    'managerole',
    'userlist',
    'managepost',
    'homeadmin',
    'addpost',
    'category',
    'managecategory',
    'manageslider',
    'addslider'

    
];
var routerNameMember = [
    'profile',
    'editprofile',
    'reward',
    'member',
    'dailyPopup',
    'confirmorder',
    'confirmorder1',
    'confirmorder2',
    'payment',
    'afterregisterStepOne',
    'afterregisterStepTwo',
    'afterregisterStepThree',
    'afterregisterStepFour',
    'afterregisterStepFive'

];
var routerCheckout = ['checkout'];
var routerLogin = ['login'];
//Router.before(IR_BeforeHooks.pageView);
Router.before(IR_BeforeHooks.isAdmin, { only: routerNameAdmin });
Router.before(IR_BeforeHooks.isAdminOrMember, { only: routerNameMember }); //for member
//Router.onAfterAction(IR_BeforeHooks.trackingRouter);
//Router.onBeforeAction(IR_BeforeHooks.checkLogin, {only: routerLogin});
// Router.onAfterAction(IR_BeforeHooks.sitemap);
//Router.onAfterAction(IR_BeforeHooks.updateMembershipId);


//Router.onBeforeAction(IR_BeforeHooks.MySubscription);
//Router.onBeforeAction(IR_BeforeHooks.checkoutNotLogin,{only:routerCheckout});
Router.before(IR_BeforeHooks.isLogin, { only: routerNameLogin });
