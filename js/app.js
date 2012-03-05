(function() {

  window.bttv = {
    views: {}
  };

  bttv.startup = function() {
    if (typeof console !== "undefined" && console !== null) {
      console.log("app startup");
    }
    $("#loading-message").html("<br>Starting Bagel Tech TV...");
    return bttv.ConfigLoader().pipe(bttv.LoadViews).then(bttv.AppReady);
  };

  jQuery(function() {
    return bttv.startup();
  });

}).call(this);
