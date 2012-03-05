(function() {

  window.Display = {
    statusDiv: null,
    FIRSTIDX: 0,
    LASTIDX: 4,
    currentWindow: 0,
    SELECTOR: 0,
    LIST: 1,
    videoList: new Array()
  };

  Display.init = function() {
    var success;
    success = true;
    this.statusDiv = document.getElementById("status");
    if (!this.statusDiv) success = false;
    return success;
  };

  Display.setTotalTime = function(total) {
    return this.totalTime = total;
  };

  Display.setTime = function(time) {
    var timeHTML, timeHour, timeMinute, timePercent, timeSecond, totalTimeHour, totalTimeMinute, totalTimeSecond, totalTimesecond;
    timePercent = (100 * time) / this.totalTime;
    timeHTML = "";
    timeHour = 0;
    timeMinute = 0;
    timeSecond = 0;
    totalTimeHour = 0;
    totalTimeMinute = 0;
    totalTimesecond = 0;
    document.getElementById("progressBar").style.width = timePercent + "%";
    if (Player.state === Player.PLAYING) {
      totalTimeHour = Math.floor(this.totalTime / 3600000);
      timeHour = Math.floor(time / 3600000);
      totalTimeMinute = Math.floor((this.totalTime % 3600000) / 60000);
      timeMinute = Math.floor((time % 3600000) / 60000);
      totalTimeSecond = Math.floor((this.totalTime % 60000) / 1000);
      timeSecond = Math.floor((time % 60000) / 1000);
      timeHTML = timeHour + ":";
      if (timeMinute === 0) {
        timeHTML += "00:";
      } else if (timeMinute < 10) {
        timeHTML += "0" + timeMinute + ":";
      } else {
        timeHTML += timeMinute + ":";
      }
      if (timeSecond === 0) {
        timeHTML += "00/";
      } else if (timeSecond < 10) {
        timeHTML += "0" + timeSecond + "/";
      } else {
        timeHTML += timeSecond + "/";
      }
      timeHTML += totalTimeHour + ":";
      if (totalTimeMinute === 0) {
        timeHTML += "00:";
      } else if (totalTimeMinute < 10) {
        timeHTML += "0" + totalTimeMinute;
      } else {
        timeHTML += totalTimeMinute;
      }
      if (totalTimeSecond === 0) {
        timeHTML += "00";
      } else if (totalTimeSecond < 10) {
        timeHTML += "0" + totalTimeSecond;
      } else {
        timeHTML += totalTimeSecond;
      }
    } else {
      timeHTML = "0:00:00/0:00:00";
    }
    return $('#timeInfo').html(timeHTML);
  };

  Display.status = function(status) {
    bttv.log(status);
    return bttv.widgetAPI.putInnerHTML(this.statusDiv, status);
  };

  Display.setVolume = function(level) {
    bttv.log("setVol/1");
    document.getElementById("volumeBar").style.width = level + "%";
    bttv.log("setVol/2");
    $('#volumeInfo').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume());
    return bttv.log("setVol/4");
  };

  Display.setVideoList = function(nameList) {
    var i, listHTML, name;
    listHTML = "";
    i = 0;
    for (name in nameList) {
      this.videoList[i] = $("#video" + i);
      listHTML = nameList[name];
      this.videoList[i].html(listHTML);
      i++;
    }
    this.videoList[this.FIRSTIDX].css("background-image", "url(" + (bttv.station.get("content_url_root")) + "/Images/listBox/selector.png)");
    if (i > 5) {
      document.getElementById("next").style.opacity = "1.0";
      document.getElementById("previous").style.opacity = "1.0";
    }
    listHTML = "1 / " + i;
    return $("#videoCount").html(listHTML);
  };

  Display.setVideoListPosition = function(position, move) {
    var i, listHTML, _results, _results2, _results3, _results4, _results5, _results6;
    listHTML = "";
    listHTML = (position + 1) + " / " + Data.getVideoCount();
    $("#videoCount").html(listHTML);
    if (Data.getVideoCount() < 5) {
      i = 0;
      _results = [];
      while (i < Data.getVideoCount()) {
        if (i === position) {
          this.videoList[i].style.backgroundImage = "url(" + (bttv.station.get("content_url_root")) + "/Images/listBox/selector.png)";
        } else {
          this.videoList[i].style.backgroundImage = "url(none)";
        }
        _results.push(i++);
      }
      return _results;
    } else if ((this.currentWindow !== this.LASTIDX && move === Main.DOWN) || (this.currentWindow !== this.FIRSTIDX && move === Main.UP)) {
      if (move === Main.DOWN) {
        this.currentWindow++;
      } else {
        this.currentWindow--;
      }
      i = 0;
      _results2 = [];
      while (i <= this.LASTIDX) {
        if (i === this.currentWindow) {
          this.videoList[i].style.backgroundImage = "url(Images/listBox/selector.png)";
        } else {
          this.videoList[i].style.backgroundImage = "url(none)";
        }
        _results2.push(i++);
      }
      return _results2;
    } else if (this.currentWindow === this.LASTIDX && move === Main.DOWN) {
      if (position === this.FIRSTIDX) {
        this.currentWindow = this.FIRSTIDX;
        i = 0;
        _results3 = [];
        while (i <= this.LASTIDX) {
          listHTML = Data.videoNames[i];
          bttv.widgetAPI.putInnerHTML(this.videoList[i], listHTML);
          if (i === this.currentWindow) {
            this.videoList[i].style.backgroundImage = "url(Images/listBox/selector.png)";
          } else {
            this.videoList[i].style.backgroundImage = "url(none)";
          }
          _results3.push(i++);
        }
        return _results3;
      } else {
        i = 0;
        _results4 = [];
        while (i <= this.LASTIDX) {
          listHTML = Data.videoNames[i + position - this.currentWindow];
          bttv.widgetAPI.putInnerHTML(this.videoList[i], listHTML);
          _results4.push(i++);
        }
        return _results4;
      }
    } else if (this.currentWindow === this.FIRSTIDX && move === Main.UP) {
      if (position === Data.getVideoCount() - 1) {
        this.currentWindow = this.LASTIDX;
        i = 0;
        _results5 = [];
        while (i <= this.LASTIDX) {
          listHTML = Data.videoNames[i + position - this.currentWindow];
          bttv.widgetAPI.putInnerHTML(this.videoList[i], listHTML);
          if (i === this.currentWindow) {
            this.videoList[i].style.backgroundImage = "url(Images/listBox/selector.png)";
          } else {
            this.videoList[i].style.backgroundImage = "url(none)";
          }
          _results5.push(i++);
        }
        return _results5;
      } else {
        i = 0;
        _results6 = [];
        while (i <= this.LASTIDX) {
          listHTML = Data.videoNames[i + position];
          bttv.widgetAPI.putInnerHTML(this.videoList[i], listHTML);
          _results6.push(i++);
        }
        return _results6;
      }
    }
  };

  Display.setDescription = function(description) {
    bttv.log("desc = " + description);
    return $("#description").html(description);
  };

  Display.hide = function() {
    return document.getElementById("main").style.display = "none";
  };

  Display.show = function() {
    return document.getElementById("main").style.display = "block";
  };

}).call(this);
