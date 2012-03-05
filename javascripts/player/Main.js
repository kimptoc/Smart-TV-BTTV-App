(function() {

  window.Main = {
    selectedVideo: 0,
    mode: 0,
    mute: 0,
    UP: 0,
    DOWN: 1,
    WINDOW: 0,
    FULLSCREEN: 1,
    NMUTE: 0,
    YMUTE: 1
  };

  Main.onLoad = function() {
    if (Player.init() && Audio.init() && Display.init() && Server.init()) {
      bttv.log("Main.onLoad, all init's done");
      Display.setVolume(Audio.getVolume());
      bttv.log("Main.onLoad, volume sorted");
      Display.setTime(0);
      bttv.log("Main.onLoad, time sorted");
      Player.stopCallback = function() {
        return Main.setWindowMode();
      };
      Server.dataReceivedCallback = function() {
        Display.setVideoList(Data.getVideoNames());
        return Main.updateCurrentVideo();
      };
      bttv.log("about to call 'fetchVideoList'");
      Server.fetchVideoList();
      return Main.enableKeys();
    } else {
      return bttv.log("Failed to initialise");
    }
  };

  Main.onUnload = function() {
    return Player.deinit();
  };

  Main.updateCurrentVideo = function(move) {
    Player.setVideoURL(Data.getVideoURL(Main.selectedVideo));
    Display.setVideoListPosition(Main.selectedVideo, move);
    return Display.setDescription(Data.getVideoDescription(Main.selectedVideo));
  };

  Main.enableKeys = function() {
    var enterKeyHandler, returnKeyHandler, volDownHandler, volUpHandler;
    bttv.log("Main.enableKeys");
    KeyboardJS.unbind.key("all");
    returnKeyHandler = function() {
      var _ref;
      bttv.log("RETURN");
      Player.stopVideo();
      if ((_ref = bttv.widgetAPI) != null) _ref.sendReturnEvent();
      return bttv.station_controller.handleShowStations();
    };
    KeyboardJS.bind.key("return", returnKeyHandler);
    KeyboardJS.bind.key("panel_return", returnKeyHandler);
    KeyboardJS.bind.key("escape", returnKeyHandler);
    KeyboardJS.bind.key("play", function() {
      bttv.log("PLAY");
      return Main.handlePlayKey();
    });
    KeyboardJS.bind.key("stop", function() {
      bttv.log("STOP");
      return Player.stopVideo();
    });
    KeyboardJS.bind.key("pause", function() {
      bttv.log("PAUSE");
      return Main.handlePauseKey();
    });
    KeyboardJS.bind.key("ff", function() {
      bttv.log("FF");
      if (Player.getState() !== Player.PAUSED) return Player.skipForwardVideo();
    });
    KeyboardJS.bind.key("rw", function() {
      bttv.log("RW");
      if (Player.getState() !== Player.PAUSED) return Player.skipBackwardVideo();
    });
    volUpHandler = function() {
      bttv.log("VOL_UP");
      if (Main.mute === 0) return Audio.setRelativeVolume(0);
    };
    KeyboardJS.bind.key("vol_up", volUpHandler);
    KeyboardJS.bind.key("panel_vol_up", volUpHandler);
    volDownHandler = function() {
      bttv.log("VOL_DOWN");
      if (Main.mute === 0) return Audio.setRelativeVolume(1);
    };
    KeyboardJS.bind.key("vol_down", volDownHandler);
    KeyboardJS.bind.key("panel_vol_down", volDownHandler);
    KeyboardJS.bind.key("down", function() {
      bttv.log("DOWN");
      return Main.selectNextVideo(Main.DOWN);
    });
    KeyboardJS.bind.key("up", function() {
      bttv.log("UP");
      return Main.selectPreviousVideo(Main.UP);
    });
    enterKeyHandler = function() {
      bttv.log("ENTER");
      return Main.toggleMode();
    };
    KeyboardJS.bind.key("enter", enterKeyHandler);
    KeyboardJS.bind.key("panel_enter", enterKeyHandler);
    return KeyboardJS.bind.key("mute", function() {
      bttv.log("MUTE");
      return Main.muteMode();
    });
  };

  Main.handlePlayKey = function() {
    switch (Player.getState()) {
      case Player.STOPPED:
        return Player.playVideo();
      case Player.PAUSED:
        return Player.resumeVideo();
      default:
        return bttv.log("Ignoring play key, not in correct state");
    }
  };

  Main.handlePauseKey = function() {
    switch (Player.getState()) {
      case Player.PLAYING:
        return Player.pauseVideo();
      default:
        return bttv.log("Ignoring pause key, not in correct state");
    }
  };

  Main.selectNextVideo = function(down) {
    Player.stopVideo();
    Main.selectedVideo = (Main.selectedVideo + 1) % Data.getVideoCount();
    return Main.updateCurrentVideo(down);
  };

  Main.selectPreviousVideo = function(up) {
    Player.stopVideo();
    if (--Main.selectedVideo < 0) Main.selectedVideo += Data.getVideoCount();
    return Main.updateCurrentVideo(up);
  };

  Main.setFullScreenMode = function() {
    if (Main.mode !== Main.FULLSCREEN) {
      Display.hide();
      Player.setFullscreen();
      return Main.mode = Main.FULLSCREEN;
    }
  };

  Main.setWindowMode = function() {
    if (Main.mode !== Main.WINDOW) {
      Display.show();
      Player.setWindow();
      return Main.mode = Main.WINDOW;
    }
  };

  Main.toggleMode = function() {
    if (Player.getState() === Player.PAUSED) Player.resumeVideo();
    switch (Main.mode) {
      case Main.WINDOW:
        return Main.setFullScreenMode();
      case Main.FULLSCREEN:
        return Main.setWindowMode();
      default:
        return bttv.log("ERROR: unexpected mode in toggleMode");
    }
  };

  Main.setMuteMode = function() {
    var volumeElement;
    if (Main.mute !== Main.YMUTE) {
      volumeElement = document.getElementById("volumeInfo");
      Audio.plugin.SetUserMute(true);
      document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/muteBar.png)";
      document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/mute.png)";
      bttv.widgetAPI.putInnerHTML(volumeElement, "MUTE");
      return Main.mute = Main.YMUTE;
    }
  };

  Main.noMuteMode = function() {
    if (Main.mute !== Main.NMUTE) {
      Audio.plugin.SetUserMute(false);
      document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/volumeBar.png)";
      document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/volume.png)";
      Display.setVolume(Audio.getVolume());
      return Main.mute = Main.NMUTE;
    }
  };

  Main.muteMode = function() {
    switch (Main.mute) {
      case Main.NMUTE:
        return Main.setMuteMode();
      case Main.YMUTE:
        return Main.noMuteMode();
      default:
        return bttv.log("ERROR: unexpected mode in muteMode");
    }
  };

}).call(this);
