(function() {

  bttv.ConfigLoader = function() {
    bttv.log("config loading...");
    return $.ajax(bttv.remote_config_url, {
      dataType: "json",
      complete: (function() {
        return typeof console !== "undefined" && console !== null ? console.log("c") : void 0;
      }),
      error: (function(x, t, e) {
        return typeof console !== "undefined" && console !== null ? console.log(x, t, e) : void 0;
      }),
      success: function(data) {
        var buid, ch, channel, channels, _i, _len, _ref, _results;
        bttv.log("channels response:", data);
        bttv.station = new Serenade.Model(data.station);
        bttv.station.set("selected_channel", 0);
        channels = new Serenade.Collection([]);
        bttv.station.hasMany('channels');
        buid = 1;
        _ref = data.channels;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          if (ch.enabled !== "false") {
            channel = new Serenade.Model(ch);
            channel.set("buid", bttv.get_buid(buid));
            buid++;
            channel.belongsTo(bttv.station);
            _results.push(bttv.station.channels.push(channel));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
  };

}).call(this);
