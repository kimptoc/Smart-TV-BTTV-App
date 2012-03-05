(function() {
  var OnNetworkDisconnected, getBandwidth, onDecoderReady, onRenderError, onServerError, setCurBuffer, setTottalBuffer, stopPlayer;

  window.Player = {
    plugin: null,
    state: -1,
    skipState: -1,
    stopCallback: null,
    originalSource: null,
    STOPPED: 0,
    PLAYING: 1,
    PAUSED: 2,
    FORWARD: 3,
    REWIND: 4
  };

  Player.init = function() {
    var success;
    success = true;
    bttv.log("init success vale :  " + success);
    this.state = this.STOPPED;
    this.plugin = document.getElementById("pluginPlayer");
    if (!this.plugin) {
      bttv.log("success vale this.plugin :  " + success);
      success = false;
    }
    bttv.log("init/2 success vale :  " + success);
    this.setWindow();
    bttv.log("setWindow success vale :  " + success);
    this.plugin.OnCurrentPlayTime = "Player.setCurTime";
    this.plugin.OnStreamInfoReady = "Player.setTotalTime";
    this.plugin.OnBufferingStart = "Player.onBufferingStart";
    this.plugin.OnBufferingProgress = "Player.onBufferingProgress";
    this.plugin.OnBufferingComplete = "Player.onBufferingComplete";
    bttv.log("init/end success vale :  " + success);
    return success;
  };

  Player.deinit = function() {
    var _ref;
    bttv.log("Player deinit !!! ");
    if (this.plugin) return (_ref = this.plugin) != null ? _ref.Stop() : void 0;
  };

  Player.setWindow = function() {
    var _ref;
    return (_ref = this.plugin) != null ? typeof _ref.SetDisplayArea === "function" ? _ref.SetDisplayArea(458, 58, 472, 270) : void 0 : void 0;
  };

  Player.setFullscreen = function() {
    var _ref;
    return (_ref = this.plugin) != null ? _ref.SetDisplayArea(0, 0, 960, 540) : void 0;
  };

  Player.setVideoURL = function(url) {
    this.url = url;
    return bttv.log("URL = " + this.url);
  };

  Player.playVideo = function() {
    if (this.url == null) {
      return bttv.log("No videos to play");
    } else {
      this.state = this.PLAYING;
      document.getElementById("play").style.opacity = "0.2";
      document.getElementById("stop").style.opacity = "1.0";
      document.getElementById("pause").style.opacity = "1.0";
      document.getElementById("forward").style.opacity = "1.0";
      document.getElementById("rewind").style.opacity = "1.0";
      Display.status("Play");
      this.setWindow();
      this.plugin.Play(this.url);
      return Audio.plugin.SetSystemMute(false);
    }
  };

  Player.pauseVideo = function() {
    this.state = this.PAUSED;
    document.getElementById("play").style.opacity = "1.0";
    document.getElementById("stop").style.opacity = "1.0";
    document.getElementById("pause").style.opacity = "0.2";
    document.getElementById("forward").style.opacity = "0.2";
    document.getElementById("rewind").style.opacity = "0.2";
    Display.status("Pause");
    return this.plugin.Pause();
  };

  Player.stopVideo = function() {
    var _ref;
    if (this.state !== this.STOPPED) {
      this.state = this.STOPPED;
      document.getElementById("play").style.opacity = "1.0";
      document.getElementById("stop").style.opacity = "0.2";
      document.getElementById("pause").style.opacity = "0.2";
      document.getElementById("forward").style.opacity = "0.2";
      document.getElementById("rewind").style.opacity = "0.2";
      Display.status("Stop");
      if ((_ref = this.plugin) != null) _ref.Stop();
      Display.setTime(0);
      if (this.stopCallback) return this.stopCallback();
    } else {
      return bttv.log("Ignoring stop request, not in correct state");
    }
  };

  Player.resumeVideo = function() {
    var _ref;
    this.state = this.PLAYING;
    document.getElementById("play").style.opacity = "0.2";
    document.getElementById("stop").style.opacity = "1.0";
    document.getElementById("pause").style.opacity = "1.0";
    document.getElementById("forward").style.opacity = "1.0";
    document.getElementById("rewind").style.opacity = "1.0";
    Display.status("Play");
    return (_ref = this.plugin) != null ? _ref.Resume() : void 0;
  };

  Player.skipForwardVideo = function() {
    var _ref;
    this.skipState = this.FORWARD;
    return (_ref = this.plugin) != null ? _ref.JumpForward(5) : void 0;
  };

  Player.skipBackwardVideo = function() {
    var _ref;
    this.skipState = this.REWIND;
    return (_ref = this.plugin) != null ? _ref.JumpBackward(5) : void 0;
  };

  Player.getState = function() {
    return this.state;
  };

  Player.onBufferingStart = function() {
    Display.status("Buffering...");
    switch (this.skipState) {
      case this.FORWARD:
        return document.getElementById("forward").style.opacity = "0.2";
      case this.REWIND:
        return document.getElementById("rewind").style.opacity = "0.2";
    }
  };

  Player.onBufferingProgress = function(percent) {
    return Display.status("Buffering:" + percent + "%");
  };

  Player.onBufferingComplete = function() {
    Display.status("Play");
    switch (this.skipState) {
      case this.FORWARD:
        return document.getElementById("forward").style.opacity = "1.0";
      case this.REWIND:
        return document.getElementById("rewind").style.opacity = "1.0";
    }
  };

  Player.setCurTime = function(time) {
    return Display.setTime(time);
  };

  Player.setTotalTime = function() {
    return Display.setTotalTime(Player.plugin.GetDuration());
  };

  onServerError = function() {
    return Display.status("Server Error!");
  };

  OnNetworkDisconnected = function() {
    return Display.status("Network Error!");
  };

  getBandwidth = function(bandwidth) {
    return bttv.log("getBandwidth " + bandwidth);
  };

  onDecoderReady = function() {
    return bttv.log("onDecoderReady");
  };

  onRenderError = function() {
    return bttv.log("onRenderError");
  };

  stopPlayer = function() {
    return Player.stopVideo();
  };

  setTottalBuffer = function(buffer) {
    return bttv.log("setTottalBuffer " + buffer);
  };

  setCurBuffer = function(buffer) {
    return bttv.log("setCurBuffer " + buffer);
  };

}).call(this);
