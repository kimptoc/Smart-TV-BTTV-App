bttv.AppReady = ->
  bttv.log "App Ready!"
  document.getElementById("app_stylesheet1").href = "#{bttv.station.get("content_url_root")}/css/Main.css"
  document.getElementById("app_stylesheet2").href = "#{bttv.station.get("content_url_root")}/css/app.css"
  bttv.station_controller = new bttv.StationController()
  bttv.setupKeymapping()
  bttv.station_controller.handleShowStations()

