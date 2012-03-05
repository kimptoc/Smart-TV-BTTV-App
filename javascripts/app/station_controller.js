(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  bttv.StationController = (function() {

    function StationController() {
      this.keyBackHandler = __bind(this.keyBackHandler, this);
      this.keySelectHandler = __bind(this.keySelectHandler, this);
    }

    StationController.prototype.handleChannelClicked = function() {
      var selected_channel;
      selected_channel = bttv.station.channels.get(bttv.station.get("selected_channel"));
      $("#loading-message").html(Serenade.render('channel', selected_channel, bttv.station_controller));
      Server.url = "" + (bttv.station.get("content_url_root")) + "/feed.php?name=" + (selected_channel.get('rss_feed_name'));
      return Main.onLoad();
    };

    StationController.prototype.handleShowStations = function() {
      $("#loading-message").html(Serenade.render('allinone', bttv.station, bttv.station_controller));
      return this.registerKeys();
    };

    StationController.prototype.keyHandler = function() {
      return bttv.log("station key handler");
    };

    StationController.prototype.registerKeys = function() {
      bttv.log("registering key handlers");
      KeyboardJS.unbind.key("all");
      KeyboardJS.bind.key("up", this.keyUpHandler);
      KeyboardJS.bind.key("down", this.keyDownHandler);
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
      var sel_chan;
      bttv.log("station key up handler");
      sel_chan = -1 + bttv.station.get("selected_channel");
      if (sel_chan >= 0) return bttv.station.set("selected_channel", sel_chan);
    };

    StationController.prototype.keyDownHandler = function() {
      var sel_chan;
      bttv.log("station key down handler");
      sel_chan = 1 + bttv.station.get("selected_channel");
      if (sel_chan < bttv.station.channels.length) {
        return bttv.station.set("selected_channel", sel_chan);
      }
    };

    return StationController;

  })();

}).call(this);
