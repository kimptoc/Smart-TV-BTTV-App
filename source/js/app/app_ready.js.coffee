bttv.AppReady = ->
  console?.log "App Ready!"
  document.getElementById("app_stylesheet").href = "#{bttv.station.get("content_url_root")}/css/app.css"
  bttv.station_controller = new bttv.StationController()
  bttv.setupKeymapping()
  bttv.station_controller.handleShowStations()

