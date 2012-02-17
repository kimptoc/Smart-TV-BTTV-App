(function() {

  app.LoadViews = function(p_views_loaded_callback) {
    var loader, url, view, views, _results;
    if (typeof console !== "undefined" && console !== null) {
      console.log("load views");
    }
    views = {
      allinone: 'allinone.serenade'
    };
    _results = [];
    for (view in views) {
      url = views[view];
      if (typeof console !== "undefined" && console !== null) {
        console.log("view loading:" + view + "/" + url);
      }
      loader = new app.ViewLoader(view, url, p_views_loaded_callback);
      _results.push(loader.load());
    }
    return _results;
  };

}).call(this);
