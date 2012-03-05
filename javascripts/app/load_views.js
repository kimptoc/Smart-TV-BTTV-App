(function() {

  bttv.LoadViews = function() {
    var promises, url_part, view, views, _fn;
    if (typeof console !== "undefined" && console !== null) {
      console.log("load views");
    }
    views = {
      channel: 'channel.serenade',
      allinone: 'allinone.serenade'
    };
    promises = void 0;
    _fn = function(view, url_part) {
      var _this = this;
      if (typeof console !== "undefined" && console !== null) {
        console.log("view loading:" + view + "/" + url_part);
      }
      return promises = $.when(promises, $.get("" + (bttv.station.get("content_url_root")) + "/views/" + url_part + ".php", function(data) {
        if (typeof console !== "undefined" && console !== null) {
          console.log("view loaded:" + view);
        }
        return Serenade.view(view, data);
      }));
    };
    for (view in views) {
      url_part = views[view];
      _fn(view, url_part);
    }
    return promises;
  };

}).call(this);
