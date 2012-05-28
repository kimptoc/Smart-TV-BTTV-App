
window.bttv =
  views: {}


bttv.log = (msg, data) ->
  actual_msg = "#{moment().format('YYYYMMDD h:mm:ss.SSS')}:#{msg}-#{data}"
  console?.log actual_msg
  alert actual_msg if Common?

bttv.get_buid = (id) ->
  "buid-#{id}"

bttv.log "app init done"