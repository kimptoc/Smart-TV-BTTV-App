//var bttv.widgetAPI = new Common.API.Widget();
//var bttv.tvKey = new Common.API.TVKeyValue();

var Main =
{
    selectedVideo : 0,
    mode : 0,
    mute : 0,
    
    UP : 0,
    DOWN : 1,

    WINDOW : 0,
    FULLSCREEN : 1,
    
    NMUTE : 0,
    YMUTE : 1
}

Main.onLoad = function()
{
    if ( Player.init() && Audio.init() && Display.init() && Server.init() )
    {
        bttv.log("Main.onLoad, all init's done");

        Display.setVolume( Audio.getVolume() );
        bttv.log("Main.onLoad, volume sorted");
        Display.setTime(0);

        bttv.log("Main.onLoad, time sorted");

        Player.stopCallback = function()
        {
            /* Return to windowed mode when video is stopped
                (by choice or when it reaches the end) */
            Main.setWindowMode();
        }

        // Start retrieving data from server
        Server.dataReceivedCallback = function()
            {
                /* Use video information when it has arrived */
                Display.setVideoList( Data.getVideoNames() );
                Main.updateCurrentVideo();
            }

        bttv.log("about to call 'fetchVideoList'");
        Server.fetchVideoList(); /* Request video information from server */

        // Enable key event processing
        this.enableKeys();

//        bttv.widgetAPI.sendReadyEvent();
    }
    else
    {
       bttv.log("Failed to initialise");
    }
}

Main.onUnload = function()
{
    Player.deinit();
}

Main.updateCurrentVideo = function(move)
{
    Player.setVideoURL( Data.getVideoURL(this.selectedVideo) );
    
    Display.setVideoListPosition(this.selectedVideo, move);

    Display.setDescription( Data.getVideoDescription(this.selectedVideo));
}

Main.enableKeys = function()
{
    document.getElementById("anchor").focus();
}

Main.keyDown = function()
{
    var keyCode = event.keyCode;
    bttv.log("Key pressed: " + keyCode);
    
    switch(keyCode)
    {
        case bttv.tvKey.KEY_RETURN:
        case bttv.tvKey.KEY_PANEL_RETURN:
            bttv.log("RETURN");
            Player.stopVideo();
            bttv.widgetAPI.sendReturnEvent(); 
            break;    
            break;
    
        case bttv.tvKey.KEY_PLAY:
            bttv.log("PLAY");
            
            this.handlePlayKey();
            break;
            
        case bttv.tvKey.KEY_STOP:
            bttv.log("STOP");
            Player.stopVideo();
            break;
            
        case bttv.tvKey.KEY_PAUSE:
            bttv.log("PAUSE");
            this.handlePauseKey();
            break;
            
        case bttv.tvKey.KEY_FF:
            bttv.log("FF");
            if(Player.getState() != Player.PAUSED)
                Player.skipForwardVideo();
            break;
        
        case bttv.tvKey.KEY_RW:
            bttv.log("RW");
            if(Player.getState() != Player.PAUSED)
                Player.skipBackwardVideo();
            break;

        case bttv.tvKey.KEY_VOL_UP:
        case bttv.tvKey.KEY_PANEL_VOL_UP:
            bttv.log("VOL_UP");
            if(this.mute == 0)
                Audio.setRelativeVolume(0);
            break;
            
        case bttv.tvKey.KEY_VOL_DOWN:
        case bttv.tvKey.KEY_PANEL_VOL_DOWN:
            bttv.log("VOL_DOWN");
            if(this.mute == 0)
                Audio.setRelativeVolume(1);
            break;      

        case bttv.tvKey.KEY_DOWN:
            bttv.log("DOWN");
            this.selectNextVideo(this.DOWN);
            break;
            
        case bttv.tvKey.KEY_UP:
            bttv.log("UP");
            this.selectPreviousVideo(this.UP);
            break;            

        case bttv.tvKey.KEY_ENTER:
        case bttv.tvKey.KEY_PANEL_ENTER:
            bttv.log("ENTER");
            this.toggleMode();
            break;
        
        case bttv.tvKey.KEY_MUTE:
            bttv.log("MUTE");
            this.muteMode();
            break;
            
        default:
            bttv.log("Unhandled key");
            break;
    }
}

Main.handlePlayKey = function()
{
    switch ( Player.getState() )
    {
        case Player.STOPPED:
            Player.playVideo();
            break;
            
        case Player.PAUSED:
            Player.resumeVideo();
            break;
            
        default:
            bttv.log("Ignoring play key, not in correct state");
            break;
    }
}

Main.handlePauseKey = function()
{
    switch ( Player.getState() )
    {
        case Player.PLAYING:
            Player.pauseVideo();
            break;
        
        default:
            bttv.log("Ignoring pause key, not in correct state");
            break;
    }
}

Main.selectNextVideo = function(down)
{
    Player.stopVideo();
    
    this.selectedVideo = (this.selectedVideo + 1) % Data.getVideoCount();

    this.updateCurrentVideo(down);
}

Main.selectPreviousVideo = function(up)
{
    Player.stopVideo();
    
    if (--this.selectedVideo < 0)
    {
        this.selectedVideo += Data.getVideoCount();
    }

    this.updateCurrentVideo(up);
}

Main.setFullScreenMode = function()
{
    if (this.mode != this.FULLSCREEN)
    {
        Display.hide();
        
        Player.setFullscreen();
        
        this.mode = this.FULLSCREEN;
    }
}

Main.setWindowMode = function()
{
    if (this.mode != this.WINDOW)
    {
        Display.show();
        
        Player.setWindow();
        
        this.mode = this.WINDOW;
    }
}

Main.toggleMode = function()
{
    if(Player.getState() == Player.PAUSED)
    {
        Player.resumeVideo();
     }
    switch (this.mode)
    {
        case this.WINDOW:
            this.setFullScreenMode();
            break;
            
        case this.FULLSCREEN:
            this.setWindowMode();
            break;
            
        default:
            bttv.log("ERROR: unexpected mode in toggleMode");
            break;
    }
}


Main.setMuteMode = function()
{
    if (this.mute != this.YMUTE)
    {
        var volumeElement = document.getElementById("volumeInfo");
		Audio.plugin.SetUserMute(true);
        document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/muteBar.png)";
        document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/mute.png)";
        bttv.widgetAPI.putInnerHTML(volumeElement, "MUTE");
        this.mute = this.YMUTE;
    }
}

Main.noMuteMode = function()
{
    if (this.mute != this.NMUTE)
    {
        Audio.plugin.SetUserMute(false);
		document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/volumeBar.png)";
        document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/volume.png)";
        Display.setVolume( Audio.getVolume() );
        this.mute = this.NMUTE;
    }
}

Main.muteMode = function()
{
    switch (this.mute)
    {
        case this.NMUTE:
            this.setMuteMode();
            break;
            
        case this.YMUTE:
            this.noMuteMode();
            break;
            
        default:
            bttv.log("ERROR: unexpected mode in muteMode");
            break;
    }
}
