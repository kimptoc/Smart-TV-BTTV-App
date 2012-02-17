(function() {

  app.AppReady = function(p_config_loaded_callback) {
    if (typeof console !== "undefined" && console !== null) {
      console.log("App Ready!");
    }
    document.getElementById("app_stylesheet").href = "" + (app.station.get("content_url_root")) + "/css/app.css";
    return $("#loading-message").html(Serenade.render('allinone', app.station));
  };

}).call(this);
