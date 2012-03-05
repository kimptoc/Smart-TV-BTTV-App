(function() {

  window.Data = {
    videoNames: [],
    videoURLs: [],
    videoDescriptions: []
  };

  Data.setVideoNames = function(list) {
    return this.videoNames = list;
  };

  Data.setVideoURLs = function(list) {
    return this.videoURLs = list;
  };

  Data.setVideoDescriptions = function(list) {
    return this.videoDescriptions = list;
  };

  Data.getVideoURL = function(index) {
    var url;
    url = this.videoURLs[index];
    if (url) {
      return url;
    } else {
      return null;
    }
  };

  Data.getVideoCount = function() {
    return this.videoURLs.length;
  };

  Data.getVideoNames = function() {
    return this.videoNames;
  };

  Data.getVideoDescription = function(index) {
    var description;
    description = this.videoDescriptions[index];
    if (description) {
      return description;
    } else {
      return "No description";
    }
  };

}).call(this);
