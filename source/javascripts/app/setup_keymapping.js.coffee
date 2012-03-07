bttv.setupKeymapping = ->
  if bttv?.tvKey?
    bttv.log "found tvKey so assuming its TV time"
    remoteControlButtons =
      "return" : bttv.tvKey.KEY_RETURN
      "panel_return" : bttv.tvKey.KEY_PANEL_RETURN
      "play" : bttv.tvKey.KEY_PLAY
      "stop" : bttv.tvKey.KEY_STOP
      "pause" : bttv.tvKey.KEY_PAUSE
      "ff" : bttv.tvKey.KEY_FF
      "rw" : bttv.tvKey.KEY_RW
      "vol_up" : bttv.tvKey.KEY_VOL_UP
      "panel_vol_up" : bttv.tvKey.KEY_PANEL_VOL_UP
      "vol_down" : bttv.tvKey.KEY_VOL_DOWN
      "panel_vol_down" : bttv.tvKey.KEY_PANEL_VOL_DOWN
      "left" : bttv.tvKey.KEY_LEFT
      "right" : bttv.tvKey.KEY_RIGHT
      "down" : bttv.tvKey.KEY_DOWN
      "up" : bttv.tvKey.KEY_UP
      "enter" : bttv.tvKey.KEY_ENTER
      "panel_enter" : bttv.tvKey.KEY_PANEL_ENTER
      "mute" : bttv.tvKey.KEY_MUTE
    KeyboardJS.locale.add "tv", remoteControlButtons
    KeyboardJS.locale.set "tv"
  else
    bttv.log "tvKey not found, so assume its a browser"
#  document.getElementById("anchor").focus();

