(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  bttv.StationController = (function() {

    function StationController() {
      this.keySelectHandler = __bind(this.keySelectHandler, this);
    }

    StationController.prototype.handleChannelClicked = function() {
      return $("#loading-message").html(Serenade.render('channel', bttv.station, bttv.station_controller));
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
      KeyboardJS.bind.key("up", this.keyUpHandler);
      KeyboardJS.bind.key("down", this.keyDownHandler);
      KeyboardJS.bind.key("return", this.keySelectHandler);
      return KeyboardJS.bind.key("enter", this.keySelectHandler);
    };

    StationController.prototype.keySelectHandler = function() {
      bttv.log("select channel " + (bttv.station.get('selected_channel')));
      return this.handleChannelClicked();
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
