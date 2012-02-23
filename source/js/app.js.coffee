window.app =
  views: {}


app.startup = ->
  console?.log "app startup"
  $("#loading-message").html("<br>Starting Bagel Tech TV...");
  app.ConfigLoader().then( -> app.LoadViews().then(app.AppReady) )


#jQuery ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl

#  app.startup()

