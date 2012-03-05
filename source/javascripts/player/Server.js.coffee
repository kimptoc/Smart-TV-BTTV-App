window.Server =
  dataReceivedCallback: null
  XHRObj: null
  url: ""

Server.init = ->
  bttv.log "Server.init"
  success = true
  success

Server.fetchVideoList = ->
  bttv.log "fetching video list", @url
  return $.ajax @url, dataType:"xml", complete: (-> console?.log "c"), error: ((x,t,e)-> console?.log x,t,e), success:(data)->
    bttv.log "got response from server re: video list", data
    Server.createVideoList(data)
#  Server.XHRObj = new XMLHttpRequest()
#  if Server.XHRObj
#    Server.XHRObj.onreadystatechange = ->
#      bttv.log "got response from server re: video list", Server.XHRObj
#      Server.createVideoList(Server.XHRObj.responseXML)  if Server.XHRObj.readyState is 4
#
#    Server.XHRObj.open "GET", Server.url
#    Server.XHRObj.overrideMimeType("text/xml")
#    Server.XHRObj.send()

Server.createVideoList = (responseXML) ->
  bttv.log "Creating video list ===============================>", responseXML
  xmlElement = responseXML.documentElement
  unless xmlElement
    bttv.log "Failed to get valid XML"
  else
    items = xmlElement.getElementsByTagName("item")
    videoNames = []
    videoURLs = []
    videoDescriptions = []
    index = 0

    while index < items.length
      titleElement = items[index].getElementsByTagName("title")[0]
      descriptionElement = items[index].getElementsByTagName("description")[0]
      bttv.log items[index].getElementsByTagName("enclosure")[0].getAttribute("url")
      linkElement = items[index].getElementsByTagName("enclosure")[0].getAttribute("url")
      if titleElement and descriptionElement and linkElement
        videoNames[index] = titleElement.firstChild.data
        videoURLs[index] = linkElement
        videoDescriptions[index] = descriptionElement.firstChild.data
      index++
    Data.setVideoNames videoNames
    Data.setVideoURLs videoURLs
    Data.setVideoDescriptions videoDescriptions
    @dataReceivedCallback()  if @dataReceivedCallback