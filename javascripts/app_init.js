(function() {

  window.bttv = {
    views: {}
  };

  bttv.log = function(msg, data) {
    if (typeof console !== "undefined" && console !== null) console.log(msg, data);
    if (typeof Common !== "undefined" && Common !== null) return alert(msg);
  };

  bttv.get_buid = function(id) {
    return "buid-" + id;
  };

  bttv.log("app init done");

}).call(this);
