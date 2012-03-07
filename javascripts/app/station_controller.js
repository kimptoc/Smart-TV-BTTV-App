(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  bttv.StationController = (function() {

    function StationController() {
      this.keyDownHandler = __bind(this.keyDownHandler, this);
      this.keyUpHandler = __bind(this.keyUpHandler, this);
      this.keyBackHandler = __bind(this.keyBackHandler, this);
      this.keySelectHandler = __bind(this.keySelectHandler, this);
    }

    StationController.prototype.highlightChannel = function(chan_id) {
      $("#" + (bttv.get_buid(chan_id + 1)) + " img").addClass("channel_logo_selected");
      return $("#" + (bttv.get_buid(chan_id + 1)) + " img").removeClass("channel_logo_notselected");
    };

    StationController.prototype.unhighlightChannel = function(chan_id) {
      $("#" + (bttv.get_buid(chan_id + 1)) + " img").removeClass("channel_logo_selected");
      return $("#" + (bttv.get_buid(chan_id + 1)) + " img").addClass("channel_logo_notselected");
    };

    StationController.prototype.handleChannelClicked = function() {
      var selected_channel;
      selected_channel = bttv.station.channels.get(bttv.station.get("selected_channel"));
      $("#loading-message").html(Serenade.render('channel', selected_channel, bttv.station_controller));
      Server.url = "" + (bttv.station.get("content_url_root")) + "/feed.php?name=" + (selected_channel.get('rss_feed_name'));
      return Main.onLoad();
    };

    StationController.prototype.handleShowStations = function() {
      var current_chan;
      $("#loading-message").html(Serenade.render('allinone', bttv.station, bttv.station_controller));
      current_chan = bttv.station.get("selected_channel");
      this.highlightChannel(current_chan);
      return this.registerKeys();
    };

    StationController.prototype.keyHandler = function() {
      return bttv.log("station key handler");
    };

    StationController.prototype.registerKeys = function() {
      bttv.log("registering key handlers");
      KeyboardJS.unbind.key("all");
      KeyboardJS.bind.key("up", this.keyUpHandler);
      KeyboardJS.bind.key("left", this.keyUpHandler);
      KeyboardJS.bind.key("down", this.keyDownHandler);
      KeyboardJS.bind.key("right", this.keyDownHandler);
      return KeyboardJS.bind.key("enter", this.keySelectHandler);
    };

    StationController.prototype.keySelectHandler = function() {
      bttv.log("select channel " + (bttv.station.get('selected_channel')));
      return this.handleChannelClicked();
    };

    StationController.prototype.keyBackHandler = function() {
      return this.handleShowStations();
    };

    StationController.prototype.keyUpHandler = function() {
      var current_chan, sel_chan;
      bttv.log("station key up handler");
      current_chan = bttv.station.get("selected_channel");
      sel_chan = -1 + current_chan;
      if (sel_chan >= 0) {
        this.unhighlightChannel(current_chan);
        bttv.station.set("selected_channel", sel_chan);
        return this.highlightChannel(sel_chan);
      }
    };

    StationController.prototype.keyDownHandler = function() {
      var current_chan, sel_chan;
      bttv.log("station key down handler");
      current_chan = bttv.station.get("selected_channel");
      sel_chan = 1 + current_chan;
      if (sel_chan < bttv.station.channels.length) {
        this.unhighlightChannel(current_chan);
        bttv.station.set("selected_channel", sel_chan);
        return this.highlightChannel(sel_chan);
      }
    };

    return StationController;

  })();

}).call(this);
