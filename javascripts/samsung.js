(function() {

  bttv.widgetAPI = typeof Common !== "undefined" && Common !== null ? new Common.API.Widget() : void 0;

  bttv.tvKey = typeof Common !== "undefined" && Common !== null ? new Common.API.TVKeyValue() : void 0;

  if (bttv.widgetAPI != null) {
    bttv.log("start bttv.widgetAPI!");
    bttv.widgetAPI.sendReadyEvent();
  } else {
    bttv.log("no bttv.widgetAPI!");
  }

}).call(this);
