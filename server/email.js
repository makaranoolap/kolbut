

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://makra.prum%40gmail.com:m016227506@smtp.gmail.com:465';
});

Meteor.methods({
	sendEmail:function(from,bcc,subject,text){
		Email.send({
		from: from,
		to: "Kbk01.yarath@kollbothkhmer.com",
		bcc:from,
		subject: subject,
		text: text
		});
	}
})