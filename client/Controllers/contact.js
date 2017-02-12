Template.contact.events({
	'click #send-email':function(e){
		var email  = $('#email').val();
		var subject = $('#subject').val();
		var text = $('#message').val();
		var emaivalid = isValidEmailAddress(email);
		if(email && subject && text){
			if(emaivalid == true){
				Meteor.call('sendEmail',email,email,subject,text);
			}else{
				Bert.alert( 'Email address invalid !', 'warning', 'growl-top-right' );
			}
			
		}else{
			if(text == ''){
				Bert.alert( 'Please input your messages !', 'warning', 'growl-top-right' );
			}
			if(subject == ''){
				Bert.alert( 'Please input your subject !', 'warning', 'growl-top-right' );
			}
			if(email == ''){
				Bert.alert( 'Please input your email address !', 'warning', 'growl-top-right' );
			}
			
		}
		
	}
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({key:"AIzaSyAKro-So2c-Oe71a0AQh0IJ1H7V3ow8tQc"});
  });
}

Template.contact.onRendered(function() {
  GoogleMaps.load();
});

Template.contact.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(11.5350364, 104.9042858),
        zoom: 17
      };
    }
  }
});

Template.contact.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});
