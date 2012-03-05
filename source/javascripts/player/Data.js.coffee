window.Data =
  videoNames: []
  videoURLs: []
  videoDescriptions: []

Data.setVideoNames = (list) ->
  @videoNames = list

Data.setVideoURLs = (list) ->
  @videoURLs = list

Data.setVideoDescriptions = (list) ->
  @videoDescriptions = list

Data.getVideoURL = (index) ->
  url = @videoURLs[index]
  if url
    url
  else
    null

Data.getVideoCount = ->
  @videoURLs.length

Data.getVideoNames = ->
  @videoNames

Data.getVideoDescription = (index) ->
  description = @videoDescriptions[index]
  if description
    description
  else
    "No description"