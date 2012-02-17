window.app =
  views: {}


app.startup = ->
  console.log "app startup"
  app.ConfigLoader(app.LoadViews)


jQuery ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl

  app.startup()

