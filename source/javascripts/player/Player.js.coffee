window.Player =
  plugin: null
  state: -1
  skipState: -1
  stopCallback: null
  originalSource: null
  STOPPED: 0
  PLAYING: 1
  PAUSED: 2
  FORWARD: 3
  REWIND: 4

Player.init = ->
  success = true
  bttv.log "init success vale :  " + success
  Player.state = -1
  Player.skipState = -1
  Player.stopCallback = null
  Player.originalSource = null
  @state = @STOPPED
  @plugin = document.getElementById("pluginPlayer")
  unless @plugin
    bttv.log "success vale this.plugin :  " + success
    success = false
  bttv.log "init/2 success vale :  " + success
  @setWindow()
  bttv.log "setWindow success vale :  " + success
  @plugin?.OnCurrentPlayTime = "Player.setCurTime"
  @plugin?.OnStreamInfoReady = "Player.setTotalTime"
  @plugin?.OnBufferingStart = "Player.onBufferingStart"
  @plugin?.OnBufferingProgress = "Player.onBufferingProgress"
  @plugin?.OnBufferingComplete = "Player.onBufferingComplete"
  bttv.log "init/end success vale :  " + success
  success

Player.deinit = ->
  bttv.log "Player deinit !!! "
  if @plugin
    @plugin?.Stop?()
#    @plugin?.ClearScreen()
    @plugin?.SetDisplayArea? 0, 0, 0, 0
    @plugin = null

Player.setWindow = ->
  @plugin?.SetDisplayArea? 458, 58, 472, 270

Player.setFullscreen = ->
  @plugin?.SetDisplayArea? 0, 0, 960, 540

Player.setVideoURL = (url) ->
  @url = url
  bttv.log "URL = " + @url

Player.playVideo = ->
  unless @url?
    bttv.log "No videos to play"
  else
    @state = @PLAYING
    document.getElementById("play").style.opacity = "0.2"
    document.getElementById("stop").style.opacity = "1.0"
    document.getElementById("pause").style.opacity = "1.0"
    document.getElementById("forward").style.opacity = "1.0"
    document.getElementById("rewind").style.opacity = "1.0"
    Display.status "Play"
    @setWindow()
    @plugin.Play @url
    Audio.plugin?.SetSystemMute? false

Player.pauseVideo = ->
  @state = @PAUSED
  document.getElementById("play").style.opacity = "1.0"
  document.getElementById("stop").style.opacity = "1.0"
  document.getElementById("pause").style.opacity = "0.2"
  document.getElementById("forward").style.opacity = "0.2"
  document.getElementById("rewind").style.opacity = "0.2"
  Display.status "Pause"
  @plugin.Pause?()

Player.stopVideo = ->
  unless @state is @STOPPED
    @state = @STOPPED
    document.getElementById("play").style.opacity = "1.0"
    document.getElementById("stop").style.opacity = "0.2"
    document.getElementById("pause").style.opacity = "0.2"
    document.getElementById("forward").style.opacity = "0.2"
    document.getElementById("rewind").style.opacity = "0.2"
    Display.status "Stop"
    @plugin?.Stop?()
    Display.setTime 0
    @stopCallback()  if @stopCallback
  else
    bttv.log "Ignoring stop request, not in correct state"

Player.resumeVideo = ->
  @state = @PLAYING
  document.getElementById("play").style.opacity = "0.2"
  document.getElementById("stop").style.opacity = "1.0"
  document.getElementById("pause").style.opacity = "1.0"
  document.getElementById("forward").style.opacity = "1.0"
  document.getElementById("rewind").style.opacity = "1.0"
  Display.status "Play"
  @plugin?.Resume?()

Player.skipForwardVideo = ->
  @skipState = @FORWARD
  @plugin?.JumpForward? 5

Player.skipBackwardVideo = ->
  @skipState = @REWIND
  @plugin?.JumpBackward? 5

Player.getState = ->
  @state

Player.onBufferingStart = ->
  Display.status "Buffering..."
  switch @skipState
    when @FORWARD
      document.getElementById("forward").style.opacity = "0.2"
    when @REWIND
      document.getElementById("rewind").style.opacity = "0.2"

Player.onBufferingProgress = (percent) ->
  Display.status "Buffering:" + percent + "%"

Player.onBufferingComplete = ->
  Display.status "Play"
  switch @skipState
    when @FORWARD
      document.getElementById("forward").style.opacity = "1.0"
    when @REWIND
      document.getElementById("rewind").style.opacity = "1.0"

Player.setCurTime = (time) ->
  Display.setTime time

Player.setTotalTime = ->
  Display.setTotalTime Player.plugin?.GetDuration?()

onServerError = ->
  Display.status "Server Error!"

OnNetworkDisconnected = ->
  Display.status "Network Error!"

getBandwidth = (bandwidth) ->
  bttv.log "getBandwidth " + bandwidth

onDecoderReady = ->
  bttv.log "onDecoderReady"

onRenderError = ->
  bttv.log "onRenderError"

stopPlayer = ->
  Player.stopVideo()

setTottalBuffer = (buffer) ->
  bttv.log "setTottalBuffer " + buffer

setCurBuffer = (buffer) ->
  bttv.log "setCurBuffer " + buffer