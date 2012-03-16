window.Display =
  statusDiv: null
  FIRSTIDX: 0
  LASTIDX: 4
  currentWindow: 0
  SELECTOR: 0
  LIST: 1
  videoList: new Array()

Display.init = ->
  success = true
  Display.currentWindow = 0
  @statusDiv = $("#status")
  success = false  unless @statusDiv
  success

Display.setTotalTime = (total) ->
  @totalTime = total

Display.setTime = (time) ->
  timePercent = (100 * time) / @totalTime
  timeHTML = ""
  timeHour = 0
  timeMinute = 0
  timeSecond = 0
  totalTimeHour = 0
  totalTimeMinute = 0
  totalTimesecond = 0
  document.getElementById("progressBar").style.width = timePercent + "%"
  if Player.state is Player.PLAYING
    totalTimeHour = Math.floor(@totalTime / 3600000)
    timeHour = Math.floor(time / 3600000)
    totalTimeMinute = Math.floor((@totalTime % 3600000) / 60000)
    timeMinute = Math.floor((time % 3600000) / 60000)
    totalTimeSecond = Math.floor((@totalTime % 60000) / 1000)
    timeSecond = Math.floor((time % 60000) / 1000)
    timeHTML = timeHour + ":"
    if timeMinute is 0
      timeHTML += "00:"
    else if timeMinute < 10
      timeHTML += "0" + timeMinute + ":"
    else
      timeHTML += timeMinute + ":"
    if timeSecond is 0
      timeHTML += "00/"
    else if timeSecond < 10
      timeHTML += "0" + timeSecond + "/"
    else
      timeHTML += timeSecond + "/"
    timeHTML += totalTimeHour + ":"
    if totalTimeMinute is 0
      timeHTML += "00:"
    else if totalTimeMinute < 10
      timeHTML += "0" + totalTimeMinute
    else
      timeHTML += totalTimeMinute
    if totalTimeSecond is 0
      timeHTML += "00"
    else if totalTimeSecond < 10
      timeHTML += "0" + totalTimeSecond
    else
      timeHTML += totalTimeSecond
  else
    timeHTML = "0:00:00/0:00:00"
  $('#timeInfo').html(timeHTML)

Display.status = (status) ->
  bttv.log status
  @statusDiv.html(status)

Display.setVolume = (level) ->
  bttv.log "setVol/1"
  document.getElementById("volumeBar").style.width = level + "%"
  bttv.log "setVol/2"
  $('#volumeInfo').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume())
  bttv.log "setVol/4"

Display.setVideoList = (nameList) ->
  listHTML = ""
  i = 0
  for name of nameList
    @videoList[i] = $("#video#{i}")
    listHTML = nameList[name]
    @videoList[i].html(listHTML)
    i++
  @videoList[@FIRSTIDX].css("background-image",  "url(#{bttv.station.get("content_url_root")}/Images/listBox/selector.png)")
  if i > 5
    document.getElementById("next").style.opacity = "1.0"
    document.getElementById("previous").style.opacity = "1.0"
  listHTML = "1 / " + i
  $("#videoCount").html(listHTML)

Display.setVideoListPosition = (position, move) ->
  listHTML = ""
  listHTML = (position + 1) + " / " + Data.getVideoCount()
  $("#videoCount").html(listHTML)
  if Data.getVideoCount() < 5
    i = 0

    while i < Data.getVideoCount()
      if i is position
        @videoList[i].css("background-image",  "url(#{bttv.station.get("content_url_root")}/Images/listBox/selector.png)")
      else
        @videoList[i].css("background-image",  "url(none)")
      i++
  else if (@currentWindow isnt @LASTIDX and move is Main.DOWN) or (@currentWindow isnt @FIRSTIDX and move is Main.UP)
    if move is Main.DOWN
      @currentWindow++
    else
      @currentWindow--
    i = 0

    while i <= @LASTIDX
      if i is @currentWindow
        @videoList[i].css("background-image",  "url(#{bttv.station.get("content_url_root")}/Images/listBox/selector.png)")
      else
        @videoList[i].css("background-image",  "url(none)")
      i++
  else if @currentWindow is @LASTIDX and move is Main.DOWN
    if position is @FIRSTIDX
      @currentWindow = @FIRSTIDX
      i = 0
      while i <= @LASTIDX
        listHTML = Data.videoNames[i]
        @videoList[i].html(listHTML)
        if i is @currentWindow
          @videoList[i].css("background-image",  "url(#{bttv.station.get("content_url_root")}/Images/listBox/selector.png)")
        else
          @videoList[i].css("background-image",  "url(none)")
        i++
    else
      i = 0
      while i <= @LASTIDX
        listHTML = Data.videoNames[i + position - @currentWindow]
        @videoList[i].html(listHTML)
        i++
  else if @currentWindow is @FIRSTIDX and move is Main.UP
    if position is Data.getVideoCount() - 1
      @currentWindow = @LASTIDX
      i = 0
      while i <= @LASTIDX
        listHTML = Data.videoNames[i + position - @currentWindow]
        @videoList[i].html(listHTML)
        if i is @currentWindow
          @videoList[i].css("background-image",  "url(#{bttv.station.get("content_url_root")}/Images/listBox/selector.png)")
        else
          @videoList[i].css("background-image",  "url(none)")
        i++
    else
      i = 0
      while i <= @LASTIDX
        listHTML = Data.videoNames[i + position]
        @videoList[i].html(listHTML)
        i++

Display.setDescription = (description) ->
  bttv.log "desc = #{description}"
  $("#description").html(description)

Display.hide = ->
  document.getElementById("main").style.display = "none"

Display.show = ->
  document.getElementById("main").style.display = "block"