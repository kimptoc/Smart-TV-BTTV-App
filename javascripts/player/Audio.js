(function() {

  window.Audio = {
    plugin: null
  };

  Audio.init = function() {
    var success;
    success = true;
    this.plugin = document.getElementById("pluginAudio");
    if (!this.plugin) success = false;
    return success;
  };

  Audio.setRelativeVolume = function(delta) {
    var _ref;
    if ((_ref = this.plugin) != null) _ref.SetVolumeWithKey(delta);
    return Display.setVolume(this.getVolume());
  };

  Audio.getVolume = function() {
    var _ref, _ref2;
    bttv.log("Volume : " + ((_ref = this.plugin) != null ? typeof _ref.GetVolume === "function" ? _ref.GetVolume() : void 0 : void 0));
    return (_ref2 = this.plugin) != null ? typeof _ref2.GetVolume === "function" ? _ref2.GetVolume() : void 0 : void 0;
  };

}).call(this);
