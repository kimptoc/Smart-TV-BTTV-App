window.app =
  views: {}


app.startup = ->
  console?.log "app startup"
  $("#loading-message").html("<br>Starting Bagel Tech TV...");
  app.ConfigLoader(app.LoadViews)


#jQuery ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl

#  app.startup()

