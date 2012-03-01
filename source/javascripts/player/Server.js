var Server =
{
    /* Callback function to be set by client */
    dataReceivedCallback : null,
    
    XHRObj : null,
//    url : "XML/videoList.xml"
     url : "http://feeds.feedburner.com/BagelTechMacVideo?format=xml"
}

Server.init = function()
{
    bttv.log("Server.init");

    var success = true;

    if (this.XHRObj)
    {
        this.XHRObj.destroy();  // Save memory
        this.XHRObj = null;
    }
    
    return success;
}

Server.fetchVideoList = function()
{
    bttv.log("fetching video list");

    if (this.XHRObj == null)
    {
        this.XHRObj = new XMLHttpRequest();
    }
    
    if (this.XHRObj)
    {
        this.XHRObj.onreadystatechange = function()
            {
                bttv.log("got response from server re: video list");
                if (Server.XHRObj.readyState == 4)
                {
                    Server.createVideoList();
                }
            }
            
        this.XHRObj.open("GET", this.url, true);
        this.XHRObj.send(null);
     }
    else
    {
        bttv.log("Failed to create XHR");
    }
}

Server.createVideoList = function()
{

	bttv.log("XHR Object status===============================>" +this.XHRObj.status);

	var xmlElement = this.XHRObj.responseXML.documentElement;
	
	if (!xmlElement)
	{
		bttv.log("Failed to get valid XML");
	}
	else
	{
		// Parse RSS
		// Get all "item" elements
		var items = xmlElement.getElementsByTagName("item");
		
		var videoNames = [ ];
		var videoURLs = [ ];
		var videoDescriptions = [ ];
		
		for (var index = 0; index < items.length; index++)
		{
			var titleElement = items[index].getElementsByTagName("title")[0];
			var descriptionElement = items[index].getElementsByTagName("description")[0];
            bttv.log(items[index].getElementsByTagName("enclosure")[0].getAttribute("url"));
			var linkElement = items[index].getElementsByTagName("enclosure")[0].getAttribute("url");
//			var linkElement = items[index].getElementsByTagName("comments")[0];

			if (titleElement && descriptionElement && linkElement)
			{
				videoNames[index] = titleElement.firstChild.data;
//				videoURLs[index] = "http://www.bageltechnews.com/wp-content/uploads/2012/01/MAC_070112.m4v";
				videoURLs[index] = linkElement;
				videoDescriptions[index] = descriptionElement.firstChild.data;
			}
		}
	
		Data.setVideoNames(videoNames);
		Data.setVideoURLs(videoURLs);
		Data.setVideoDescriptions(videoDescriptions);
		
		if (this.dataReceivedCallback)
		{
			this.dataReceivedCallback();    /* Notify all data is received and stored */
		}
    }
}
