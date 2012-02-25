bttv.LoadViews = ->
  console?.log "load views"

  views =
#    station : '/views/station.serenade'
    channel : 'channel.serenade'
    allinone : 'allinone.serenade'

  promises = undefined
  for view, url_part of views
    do (view, url_part) ->
      console?.log "view loading:#{view}/#{url_part}"
      promises = $.when promises, $.get "#{bttv.station.get("content_url_root")}/views/#{url_part}.php", (data)=>
  #      console?.log "view loaded:#{view}", data
        console?.log "view loaded:#{view}"
        Serenade.view(view  ,data)
  return promises

#      local_view = view
#      console.log "view loaded:#{view}"
#      console.log "view loaded:#{local_view}", data
  #    app.views['/views/station.serenade'] = Serenade.View('/views/station.serenade',data)
#      Serenade.view(local_view,data)
  #    element = Serenade.view(data).render()
  #  element = Serenade.view('h1 "Hello World"').render()
  #    document.body.appendChild(element)

