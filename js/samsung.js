(function() {
  var _ref;

  app.widgetAPI = new Common.API.Widget();

  app.tvKey = new Common.API.TVKeyValue();

  if ((_ref = app.widgetAPI) != null) _ref.sendReadyEvent();

}).call(this);
