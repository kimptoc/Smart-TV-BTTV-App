window.Audio = plugin: null

Audio.init = ->
  success = true
  @plugin = document.getElementById("pluginAudio")
  success = false  unless @plugin
  success

Audio.setRelativeVolume = (delta) ->
  @plugin?.SetVolumeWithKey delta
  Display.setVolume @getVolume()

Audio.getVolume = ->
  bttv.log "Volume : " + @plugin?.GetVolume?()
  @plugin?.GetVolume?()