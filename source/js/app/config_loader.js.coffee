app.log = (msg, data) ->
  console?.log msg, data
  alert msg if Common?

app.ConfigLoader = ->
  app.log "config loading..."
  return $.ajax app.remote_config_url, dataType:"json", complete: (-> console?.log "c"), error: ((x,t,e)-> console?.log x,t,e), success:(data)->
    app.log "channels response:",data
    # convert to model objects - station, channels
    app.station = new Serenade.Model data.station
    channels = new Serenade.Collection []
    app.station.hasMany 'channels'

    for ch in data.channels
#      console.log ch
      if ch.enabled != "false"
        channel = new Serenade.Model ch
        channel.belongsTo app.station
        app.station.channels.push channel


