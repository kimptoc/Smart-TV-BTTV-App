(function() {

  bttv.AppReady = function() {
    if (typeof console !== "undefined" && console !== null) {
      console.log("App Ready!");
    }
    document.getElementById("app_stylesheet").href = "" + (bttv.station.get("content_url_root")) + "/css/app.css";
    bttv.station_controller = new bttv.StationController();
    bttv.setupKeymapping();
    return bttv.station_controller.handleShowStations();
  };

}).call(this);
