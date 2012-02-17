(function() {

  window.app = {
    views: {}
  };

  app.startup = function() {
    if (typeof console !== "undefined" && console !== null) {
      console.log("app startup");
    }
    $("#loading-message").html("<br>Starting Bagel Tech TV...");
    return app.ConfigLoader(app.LoadViews);
  };

}).call(this);
