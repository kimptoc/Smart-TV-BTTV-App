(function() {

  app.ViewLoader = (function() {

    function ViewLoader(p_view, p_url, p_callback) {
      this.view = p_view;
      this.url = "" + (app.station.get("content_url_root")) + "/views/" + p_url + ".php";
      this.callback = p_callback;
    }

    ViewLoader.prototype.load = function() {
      var _this = this;
      return $.get(this.url, function(data, t, j) {
        console.log("view loaded:" + _this.view);
        Serenade.view(_this.view, data);
        return _this.callback();
      });
    };

    return ViewLoader;

  })();

}).call(this);
