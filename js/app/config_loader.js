(function() {

  app.ConfigLoader = function(p_config_loaded_callback) {
    console.log("Config Loader");
    return $.ajax(app.remote_config_url, {
      dataType: "json",
      complete: (function() {
        return console.log("c");
      }),
      error: (function(x, t, e) {
        return console.log(x, t, e);
      }),
      success: function(data) {
        var ch, channel, channels, _i, _len, _ref;
        console.log("channels response:", data);
        app.station = new Serenade.Model(data.station);
        channels = new Serenade.Collection([]);
        app.station.hasMany('channels');
        _ref = data.channels;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          if (ch.enabled !== "false") {
            channel = new Serenade.Model(ch);
            channel.belongsTo(app.station);
            app.station.channels.push(channel);
          }
        }
        return p_config_loaded_callback(app.AppReady);
      }
    });
  };

}).call(this);
