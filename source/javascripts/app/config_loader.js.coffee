
bttv.ConfigLoadError = (x,t,e) ->
  bttv.log "Error loading config"
  $.get "views/config_load_error.serenade", (data)=>
#    console?.log "error view loaded", data
    v = Serenade.view('config_load_error', data)
    html_part = v.render()
    bttv.log html_part
    $('#intro-image').fadeOut 800, ->
      $("#loading-message").html(html_part)

bttv.ConfigLoadComplete = ->
  bttv.log "Config Load Complete"


bttv.ConfigLoader = ->
  bttv.log "config loading..."
  return $.ajax bttv.remote_config_url, dataType:"json", complete: bttv.ConfigLoadComplete, error: bttv.ConfigLoadError, success:(data)->
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


