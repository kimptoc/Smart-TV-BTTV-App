bttv.enableKeys = ->
  remoteControlButtons =
    "remote_play" : bttv?.tvKey?.KEY_PLAY
    "remote_up" : bttv?.tvKey?.KEY_UP
    "remote_down" : bttv?.tvKey?.KEY_DOWN
    "up": 38,
  KeyboardJS.locale.add "tv", remoteControlButtons
  KeyboardJS.locale.set "tv"
#  document.getElementById("anchor").focus();

bttv.AppReady = ->
  console?.log "App Ready!"
  document.getElementById("app_stylesheet").href = "#{bttv.station.get("content_url_root")}/css/app.css"
  bttv.station_controller = new bttv.StationController()
  bttv.enableKeys()
  bttv.station_controller.handleShowStations()

