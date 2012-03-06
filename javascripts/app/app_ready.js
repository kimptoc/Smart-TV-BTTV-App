(function() {

  bttv.AppReady = function() {
    bttv.log("App Ready!");
    document.getElementById("app_stylesheet1").href = "" + (bttv.station.get("content_url_root")) + "/css/Main.css";
    document.getElementById("app_stylesheet2").href = "" + (bttv.station.get("content_url_root")) + "/css/app.css";
    bttv.station_controller = new bttv.StationController();
    bttv.setupKeymapping();
    return $('#intro-image').fadeOut(1000, function() {
      return bttv.station_controller.handleShowStations();
    });
  };

}).call(this);
