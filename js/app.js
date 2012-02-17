(function() {

  window.app = {
    views: {}
  };

  app.startup = function() {
    console.log("app startup");
    $("#loading-message").html("<br>Starting Bagel Tech TV...");
    return app.ConfigLoader(app.LoadViews);
  };

  jQuery(function() {
    return app.startup();
  });

}).call(this);
