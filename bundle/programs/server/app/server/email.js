(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/email.js                                                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
Meteor.startup(function () {                                           // 3
	process.env.MAIL_URL = 'smtp://makra.prum%40gmail.com:m016227506@smtp.gmail.com:465';
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 7
	sendEmail: function (from, bcc, subject, text) {                      // 8
		Email.send({                                                         // 9
			from: from,                                                         // 10
			to: "Kbk01.yarath@kollbothkhmer.com",                               // 11
			bcc: from,                                                          // 12
			subject: subject,                                                   // 13
			text: text                                                          // 14
		});                                                                  //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=email.js.map
