app.AppReady = (p_config_loaded_callback)->
  console.log "App Ready!"
  document.getElementById("app_stylesheet").href = "#{app.station.get("content_url_root")}/css/app.css"
  $("#loading-message").html(Serenade.render('allinone',app.station));

