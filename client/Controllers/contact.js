Template.contact.events({
	'click #send-email':function(e){
		alert('Ok');
		Meteor.call('sentEmail');
	}
})