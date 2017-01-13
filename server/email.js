Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
});
Meteor.methods({
	sendEmail:function(){
		Email.send({
		from: "from@mailinator.com",
		to: "alpha@mailinator.com",
		subject: "Test Emails",
		text: "test emails"
		});
	}
})