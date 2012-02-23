class app.StationController
  handleChannelClicked: ->
#    alert("channel clicked!")
    $("#loading-message").html(Serenade.render('channel',app.station, app.station_controller))

  handleShowStations: ->
#    alert("channel clicked!")
    $("#loading-message").html(Serenade.render('allinone',app.station, app.station_controller))

