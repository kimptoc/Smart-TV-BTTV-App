class app.ViewLoader
  constructor: (p_view, p_url, p_callback) ->
    @view = p_view
    @url = "http://localhost/scrap/bttv/views/#{p_url}.php"
    @callback = p_callback
  load: ->
    $.get @url, (data, t, j)=>
#      console.log "view loaded:#{@view}", data
      console.log "view loaded:#{@view}"
      Serenade.view(@view  ,data)
      @callback()

