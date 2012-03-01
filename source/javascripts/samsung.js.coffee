bttv.widgetAPI = new Common?.API.Widget()
bttv.tvKey = new Common?.API.TVKeyValue()

if bttv.widgetAPI?
  bttv.log "start bttv.widgetAPI!"
  bttv.widgetAPI.sendReadyEvent()
else
  bttv.log "no bttv.widgetAPI!"

