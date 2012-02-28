
bttv.ConfigLoader = ->
  bttv.log "config loading..."
  return $.ajax bttv.remote_config_url, dataType:"json", complete: (-> console?.log "c"), error: ((x,t,e)-> console?.log x,t,e), success:(data)->
    bttv.log "channels response:",data
    # convert to model objects - station, channels
    bttv.station = new Serenade.Model data.station
    bttv.station.set "selected_channel", 0 # the first one
    channels = new Serenade.Collection []
    bttv.station.hasMany 'channels'
    buid = 1

    for ch in data.channels
#      console.log ch
      if ch.enabled != "false"
        channel = new Serenade.Model ch
        channel.set "buid", bttv.get_buid(buid)
        buid++
        channel.belongsTo bttv.station
        bttv.station.channels.push channel


