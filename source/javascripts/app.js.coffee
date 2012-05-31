
bttv.startup = ->
  bttv.log "app startup"
  $("#loading-message").html("<br>Starting British Tech TV...");
  FlurryAgent?.startSession("FH6WGT678Y3XZ6HSN7XP")
  bttv.ConfigLoader().pipe(bttv.LoadViews).then(bttv.AppReady)


jQuery ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl
  $('#intro-image').fadeIn 1000

  bttv.startup()

