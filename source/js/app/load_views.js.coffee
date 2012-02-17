app.LoadViews = (p_views_loaded_callback)->
  console.log "load views"

  views =
#    station : '/views/station.serenade'
#    channels : '/views/channels.serenade'
    allinone : 'allinone.serenade'

  for view, url of views
    console.log "view loading:#{view}/#{url}"
    loader = new app.ViewLoader(view, url, p_views_loaded_callback)
    loader.load()
#      local_view = view
#      console.log "view loaded:#{view}"
#      console.log "view loaded:#{local_view}", data
  #    app.views['/views/station.serenade'] = Serenade.View('/views/station.serenade',data)
#      Serenade.view(local_view,data)
  #    element = Serenade.view(data).render()
  #  element = Serenade.view('h1 "Hello World"').render()
  #    document.body.appendChild(element)

