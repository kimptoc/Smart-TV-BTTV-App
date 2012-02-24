class app.StationController
  handleChannelClicked: ->
    $("#loading-message").html(Serenade.render('channel',app.station, app.station_controller))

  handleShowStations: ->
    $("#loading-message").html(Serenade.render('allinone',app.station, app.station_controller))

  keyHandler: ->
    app.log "station key handler"
