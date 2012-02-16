window.app = { views: {} }


app.startup_callback = ->
  $.ajax 'http://bttv.kimptoc.net/Smart-TV-BTTV-Config/channels.json.php', dataType:"json", complete: (-> console.log "c"), error: ((x,t,e)-> console.log x,t,e), success:(data)->
    console.log "channels response:",data
    # convert to model objects - station, channels
    app.station = new Serenade.Model data.station
    channels = new Serenade.Collection []
    app.station.hasMany 'channels'

    for ch in data.channels
#      console.log ch
      if ch.enabled != "false"
        channel = new Serenade.Model ch
        channel.belongsTo app.station
        app.station.channels.push channel


    document.body.appendChild(Serenade.render('allinone',app.station))

#    document.body.appendChild(Serenade.render('channels',app.station))

    # display UI
    # display title/station info
    # display each channel - loop here or in template?

class app.ViewLoader
  constructor: (p_view, p_url) ->
    @view = p_view
    @url = p_url
  load: ->
    $.get @url, (data, t, j)=>
#      console.log "view loaded:#{@view}", data
      console.log "view loaded:#{@view}"
      Serenade.view(@view  ,data)
      app.startup_callback()


app.startup = ->
  console.log "app startup"

  views =
#    station : '/views/station.serenade'
#    channels : '/views/channels.serenade'
    allinone : '/views/allinone.serenade'

  for view, url of views
    console.log "view loading:#{view}/#{url}"
    loader = new app.ViewLoader(view, url)
    loader.load()
#      local_view = view
#      console.log "view loaded:#{view}"
#      console.log "view loaded:#{local_view}", data
  #    app.views['/views/station.serenade'] = Serenade.View('/views/station.serenade',data)
#      Serenade.view(local_view,data)
  #    element = Serenade.view(data).render()
  #  element = Serenade.view('h1 "Hello World"').render()
  #    document.body.appendChild(element)



window.onload = ->
#  alert("my onload")
#  tmpl = $("#app").html()
#  console.log tmpl

  app.startup()

