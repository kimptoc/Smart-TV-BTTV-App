app.AppReady = (p_config_loaded_callback)->
  console.log "App Ready!"
  document.body.appendChild(Serenade.render('allinone',app.station))

