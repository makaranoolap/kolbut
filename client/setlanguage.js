if (Meteor.isClient) {
  Meteor.startup(function () {
    TAPi18n.setLanguage('en');
  });
}