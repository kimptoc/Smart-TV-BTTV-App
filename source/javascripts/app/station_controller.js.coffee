class bttv.StationController
  handleChannelClicked: ->
    #todo - pass in model of selected channel
    selected_channel = bttv.station.channels.get(bttv.station.get "selected_channel")
    $("#loading-message").html(Serenade.render('channel',selected_channel, bttv.station_controller))
    #todo set Server.url to feed url
    Server.url = "#{bttv.station.get("content_url_root")}/feed.php?name=#{selected_channel.get 'rss_feed_name'}"
#    Server.url = "http://localhost/scrap/bttv/samples/bageltechmac_rss.xml.php"
    Main.onLoad()

  handleShowStations: ->
    $("#loading-message").html(Serenade.render('allinone',bttv.station, bttv.station_controller))
    @registerKeys()

  keyHandler: ->
    bttv.log "station key handler"

  registerKeys: ->
    bttv.log "registering key handlers"
    KeyboardJS.unbind.key("all")
    KeyboardJS.bind.key("up", @keyUpHandler)
    KeyboardJS.bind.key("down", @keyDownHandler)
#    KeyboardJS.bind.key("return", @keyBackHandler)
    KeyboardJS.bind.key("enter", @keySelectHandler)

  keySelectHandler: =>
    bttv.log "select channel #{bttv.station.get 'selected_channel'}"
    @handleChannelClicked()

  keyBackHandler: =>
    @handleShowStations()

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
