class bttv.StationController
  handleChannelClicked: ->
    $("#loading-message").html(Serenade.render('channel',bttv.station, bttv.station_controller))

  handleShowStations: ->
    $("#loading-message").html(Serenade.render('allinone',bttv.station, bttv.station_controller))
    @registerKeys()

  keyHandler: ->
    bttv.log "station key handler"

  registerKeys: ->
    bttv.log "registering key handlers"
    KeyboardJS.bind.key("up", @keyUpHandler)
    KeyboardJS.bind.key("down", @keyHandler)

  keyUpHandler: ->
    bttv.log "station key up handler"
