#=require "jquery-1.7.1.js"
#=require "keyboard"
#=require "serenade"

window.bttv =
  views: {}


bttv.startup = ->
  console?.log "app startup"
  $("#loading-message").html("<br>Starting Bagel Tech TV...");
  bttv.ConfigLoader().pipe(bttv.LoadViews).then(bttv.AppReady)


jQuery ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl

  bttv.startup()

