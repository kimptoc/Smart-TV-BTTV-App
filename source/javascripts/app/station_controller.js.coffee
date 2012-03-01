class bttv.StationController
  handleChannelClicked: ->
    #todo - pass in model of selected channel
    $("#loading-message").html(Serenade.render('channel',bttv.station, bttv.station_controller))
    Main.onLoad()

  handleShowStations: ->
    $("#loading-message").html(Serenade.render('allinone',bttv.station, bttv.station_controller))
    @registerKeys()

  keyHandler: ->
    bttv.log "station key handler"

  registerKeys: ->
    bttv.log "registering key handlers"
    KeyboardJS.bind.key("up", @keyUpHandler)
    KeyboardJS.bind.key("down", @keyDownHandler)
    KeyboardJS.bind.key("return", @keySelectHandler)
    KeyboardJS.bind.key("enter", @keySelectHandler)

  keySelectHandler: =>
    bttv.log "select channel #{bttv.station.get 'selected_channel'}"
    @handleChannelClicked()

  keyUpHandler: ->
    bttv.log "station key up handler"
    sel_chan = -1 + bttv.station.get "selected_channel"
    if sel_chan >= 0
      bttv.station.set "selected_channel", sel_chan

  keyDownHandler: ->
    bttv.log "station key down handler"
    sel_chan = 1 + bttv.station.get "selected_channel"
    if sel_chan < bttv.station.channels.length
      bttv.station.set "selected_channel", sel_chan
