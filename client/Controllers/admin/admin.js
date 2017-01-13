Template.mainAdmin.events({
	'click .lang':function(e){
		e.preventDefault();
		var lang = $(e.currentTarget).attr('lang');
		Session.set('language',lang);

	},
	'click #logout':function(e){
		e.preventDefault();
		Meteor.logout();
		Router.go('/login');
	}
})