bttv.log = (msg, data) ->
  console?.log msg, data
  alert msg if Common?

bttv.ConfigLoader = ->
  bttv.log "config loading..."
  return $.ajax bttv.remote_config_url, dataType:"json", complete: (-> console?.log "c"), error: ((x,t,e)-> console?.log x,t,e), success:(data)->
    bttv.log "channels response:",data
    # convert to model objects - station, channels
    bttv.station = new Serenade.Model data.station
    channels = new Serenade.Collection []
    bttv.station.hasMany 'channels'

    for ch in data.channels
#      console.log ch
      if ch.enabled != "false"
        channel = new Serenade.Model ch
        channel.belongsTo bttv.station
        bttv.station.channels.push channel


