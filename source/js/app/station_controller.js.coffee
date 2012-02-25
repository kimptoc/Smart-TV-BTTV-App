class bttv.StationController
  handleChannelClicked: ->
    $("#loading-message").html(Serenade.render('channel',bttv.station, bttv.station_controller))

  handleShowStations: ->
    $("#loading-message").html(Serenade.render('allinone',bttv.station, bttv.station_controller))
    @registerKeys()

  keyHandler: ->
    bttv.log "station key handler"

  registerKeys: ->
    KeyboardJS.bind.key('up', @keyUpHandler)
    KeyboardJS.bind.key('remote_up', @keyUpHandler)

  keyUpHandler: ->
    bttv.log "station key up handler"
