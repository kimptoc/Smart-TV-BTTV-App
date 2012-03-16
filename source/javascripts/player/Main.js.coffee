window.Main =
  selectedVideo: 0
  mode: 0
  mute: 0
  UP: 0
  DOWN: 1
  WINDOW: 0
  FULLSCREEN: 1
  NMUTE: 0
  YMUTE: 1

Main.onLoad = ->
  if Player.init() and Audio.init() and Display.init() and Server.init()
    bttv.log "Main.onLoad, all init's done"
    Display.setVolume Audio.getVolume()
    bttv.log "Main.onLoad, volume sorted"
    Display.setTime 0
    bttv.log "Main.onLoad, time sorted"
    Main.selectedVideo = 0
    Player.stopCallback = ->
      Main.setWindowMode()

    Server.dataReceivedCallback = ->
      Display.setVideoList Data.getVideoNames()
      Main.updateCurrentVideo()

    bttv.log "about to call 'fetchVideoList'"
    Server.fetchVideoList()
    Main.enableKeys()
  else
    bttv.log "Failed to initialise"

Main.onUnload = ->
  Player.deinit()

Main.updateCurrentVideo = (move) ->
  Player.setVideoURL Data.getVideoURL(Main.selectedVideo)
  Display.setVideoListPosition Main.selectedVideo, move
  Display.setDescription Data.getVideoDescription(Main.selectedVideo)

Main.enableKeys = ->
  bttv.log "Main.enableKeys"
  KeyboardJS.unbind.key "all"
  returnKeyHandler = ->
    bttv.log "RETURN"
    Player.stopVideo()
    bttv.widgetAPI?.sendReturnEvent()
    bttv.station_controller.handleShowStations()

  KeyboardJS.bind.key "return", returnKeyHandler
  KeyboardJS.bind.key "panel_return", returnKeyHandler
  KeyboardJS.bind.key "escape", returnKeyHandler
  KeyboardJS.bind.key "play", ->
    bttv.log "PLAY"
    Main.handlePlayKey()

  KeyboardJS.bind.key "stop", ->
    bttv.log "STOP"
    Player.stopVideo()

  KeyboardJS.bind.key "pause", ->
    bttv.log "PAUSE"
    Main.handlePauseKey()

  KeyboardJS.bind.key "ff", ->
    bttv.log "FF"
    Player.skipForwardVideo()  unless Player.getState() is Player.PAUSED

  KeyboardJS.bind.key "rw", ->
    bttv.log "RW"
    Player.skipBackwardVideo()  unless Player.getState() is Player.PAUSED

  volUpHandler = ->
    bttv.log "VOL_UP"
    Audio.setRelativeVolume 0  if Main.mute is 0

  KeyboardJS.bind.key "vol_up", volUpHandler
  KeyboardJS.bind.key "panel_vol_up", volUpHandler
  volDownHandler = ->
    bttv.log "VOL_DOWN"
    Audio.setRelativeVolume 1  if Main.mute is 0

  KeyboardJS.bind.key "vol_down", volDownHandler
  KeyboardJS.bind.key "panel_vol_down", volDownHandler
  KeyboardJS.bind.key "down", ->
    bttv.log "DOWN"
    Main.selectNextVideo Main.DOWN

  KeyboardJS.bind.key "up", ->
    bttv.log "UP"
    Main.selectPreviousVideo Main.UP

  enterKeyHandler = ->
    bttv.log "ENTER"
    Main.toggleMode()

  KeyboardJS.bind.key "enter", enterKeyHandler
  KeyboardJS.bind.key "panel_enter", enterKeyHandler
  KeyboardJS.bind.key "mute", ->
    bttv.log "MUTE"
    Main.muteMode()

Main.handlePlayKey = ->
  switch Player.getState()
    when Player.STOPPED
      Player.playVideo()
    when Player.PAUSED
      Player.resumeVideo()
    else
      bttv.log "Ignoring play key, not in correct state"

Main.handlePauseKey = ->
  switch Player.getState()
    when Player.PLAYING
      Player.pauseVideo()
    else
      bttv.log "Ignoring pause key, not in correct state"

Main.selectNextVideo = (down) ->
  Player.stopVideo()
  Main.selectedVideo = (Main.selectedVideo + 1) % Data.getVideoCount()
  Main.updateCurrentVideo down

Main.selectPreviousVideo = (up) ->
  Player.stopVideo()
  Main.selectedVideo += Data.getVideoCount()  if --Main.selectedVideo < 0
  Main.updateCurrentVideo up

Main.setFullScreenMode = ->
  unless Main.mode is Main.FULLSCREEN
    Display.hide()
    Player.setFullscreen()
    Main.mode = Main.FULLSCREEN

Main.setWindowMode = ->
  unless Main.mode is Main.WINDOW
    Display.show()
    Player.setWindow()
    Main.mode = Main.WINDOW

Main.toggleMode = ->
  Player.resumeVideo()  if Player.getState() is Player.PAUSED
  switch Main.mode
    when Main.WINDOW
      Main.setFullScreenMode()
    when Main.FULLSCREEN
      Main.setWindowMode()
    else
      bttv.log "ERROR: unexpected mode in toggleMode"

Main.setMuteMode = ->
  unless Main.mute is Main.YMUTE
    Audio.plugin.SetUserMute true
    document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/muteBar.png)"
    document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/mute.png)"
    $("volumeInfo").html("MUTE")
    Main.mute = Main.YMUTE

Main.noMuteMode = ->
  unless Main.mute is Main.NMUTE
    Audio.plugin.SetUserMute false
    document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/volumeBar.png)"
    document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/volume.png)"
    Display.setVolume Audio.getVolume()
    Main.mute = Main.NMUTE

Main.muteMode = ->
  switch Main.mute
    when Main.NMUTE
      Main.setMuteMode()
    when Main.YMUTE
      Main.noMuteMode()
    else
      bttv.log "ERROR: unexpected mode in muteMode"