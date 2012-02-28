
window.bttv =
  views: {}


bttv.log = (msg, data) ->
  console?.log msg, data
  alert msg if Common?

bttv.get_buid = (id) ->
  "buid-#{id}"

bttv.log "app init done"