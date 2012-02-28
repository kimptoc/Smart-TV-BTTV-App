bttv.widgetAPI = new Common?.API.Widget()
bttv.tvKey = new Common?.API.TVKeyValue()

if bttv.widgetAPI?
  bttv.log "start widgetAPI!"
  bttv.widgetAPI.sendReadyEvent()
else
  bttv.log "no widgetAPI!"

