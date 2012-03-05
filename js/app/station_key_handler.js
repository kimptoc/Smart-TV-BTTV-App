(function() {

  app.StationKeyHandler = function() {
    if (typeof console !== "undefined" && console !== null) {
      console.log("station key handler");
    }
    return alert("station key handler/a");
  };

}).call(this);
