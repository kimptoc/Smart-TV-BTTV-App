app.enableKeys = ->
  document.getElementById("anchor").focus();

app.AppReady = ->
  console?.log "App Ready!"
  document.getElementById("app_stylesheet").href = "#{app.station.get("content_url_root")}/css/app.css"
  app.station_controller = new app.StationController()
  app.station_controller.handleShowStations()
  app.enableKeys()

