
bttv.startup = ->
  bttv.log "app startup"
  $("#loading-message").html("<br>Starting Bagel Tech TV...");
  FlurryAgent?.startSession("FH6WGT678Y3XZ6HSN7XP")
  bttv.ConfigLoader().pipe(bttv.LoadViews).then(bttv.AppReady)


jQuery ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl

  bttv.startup()

