(function() {

  bttv.startup = function() {
    bttv.log("app startup");
    $("#loading-message").html("<br>Starting Bagel Tech TV...");
    if (typeof FlurryAgent !== "undefined" && FlurryAgent !== null) {
      FlurryAgent.startSession("FH6WGT678Y3XZ6HSN7XP");
    }
    return bttv.ConfigLoader().pipe(bttv.LoadViews).then(bttv.AppReady);
  };

  jQuery(function() {
    return bttv.startup();
  });

}).call(this);
