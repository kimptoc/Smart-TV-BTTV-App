(function() {

  window.Server = {
    dataReceivedCallback: null,
    XHRObj: null,
    url: ""
  };

  Server.init = function() {
    var success;
    bttv.log("Server.init");
    success = true;
    return success;
  };

  Server.fetchVideoList = function() {
    bttv.log("fetching video list", this.url);
    return $.ajax(this.url, {
      dataType: "xml",
      complete: (function() {
        return typeof console !== "undefined" && console !== null ? console.log("c") : void 0;
      }),
      error: (function(x, t, e) {
        return typeof console !== "undefined" && console !== null ? console.log(x, t, e) : void 0;
      }),
      success: function(data) {
        bttv.log("got response from server re: video list", data);
        return Server.createVideoList(data);
      }
    });
  };

  Server.createVideoList = function(responseXML) {
    var descriptionElement, index, items, linkElement, titleElement, videoDescriptions, videoNames, videoURLs, xmlElement;
    bttv.log("Creating video list ===============================>", responseXML);
    xmlElement = responseXML.documentElement;
    if (!xmlElement) {
      return bttv.log("Failed to get valid XML");
    } else {
      items = xmlElement.getElementsByTagName("item");
      videoNames = [];
      videoURLs = [];
      videoDescriptions = [];
      index = 0;
      while (index < items.length) {
        titleElement = items[index].getElementsByTagName("title")[0];
        descriptionElement = items[index].getElementsByTagName("description")[0];
        bttv.log(items[index].getElementsByTagName("enclosure")[0].getAttribute("url"));
        linkElement = items[index].getElementsByTagName("enclosure")[0].getAttribute("url");
        if (titleElement && descriptionElement && linkElement) {
          videoNames[index] = titleElement.firstChild.data;
          videoURLs[index] = linkElement;
          videoDescriptions[index] = descriptionElement.firstChild.data;
        }
        index++;
      }
      Data.setVideoNames(videoNames);
      Data.setVideoURLs(videoURLs);
      Data.setVideoDescriptions(videoDescriptions);
      if (this.dataReceivedCallback) return this.dataReceivedCallback();
    }
  };

}).call(this);
