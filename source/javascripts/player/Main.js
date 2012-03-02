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
        Main.enableKeys();

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
    Player.setVideoURL( Data.getVideoURL(Main.selectedVideo) );
    
    Display.setVideoListPosition(Main.selectedVideo, move);

    Display.setDescription( Data.getVideoDescription(Main.selectedVideo));
}

Main.enableKeys = function()
{
    bttv.log("Main.enableKeys");
    KeyboardJS.unbind.key("all")
//    document.getElementById("anchor").focus();
    var returnKeyHandler = function() {
        bttv.log("RETURN");
        Player.stopVideo();
        bttv.widgetAPI.sendReturnEvent();
        bttv.station_controller.handleShowStations()
    };
    KeyboardJS.bind.key("return", returnKeyHandler );
    KeyboardJS.bind.key("panel_return", returnKeyHandler );
    KeyboardJS.bind.key("play", function() {
        bttv.log("PLAY");
        Main.handlePlayKey();
    } );
    KeyboardJS.bind.key("stop", function() {
        bttv.log("STOP");
        Player.stopVideo();
    } );
    KeyboardJS.bind.key("pause", function() {
        bttv.log("PAUSE");
        Main.handlePauseKey();
    } );
    KeyboardJS.bind.key("ff", function() {
        bttv.log("FF");
        if(Player.getState() != Player.PAUSED)
            Player.skipForwardVideo();
    } );
    KeyboardJS.bind.key("rw", function() {
        bttv.log("RW");
        if(Player.getState() != Player.PAUSED)
            Player.skipBackwardVideo();
    } );
    var volUpHandler = function() {
        bttv.log("VOL_UP");
        if(Main.mute == 0)
            Audio.setRelativeVolume(0);
    };
    KeyboardJS.bind.key("vol_up", volUpHandler);
    KeyboardJS.bind.key("panel_vol_up", volUpHandler);
    var volDownHandler = function() {
        bttv.log("VOL_DOWN");
        if(Main.mute == 0)
            Audio.setRelativeVolume(1);
    };
    KeyboardJS.bind.key("vol_down", volDownHandler);
    KeyboardJS.bind.key("panel_vol_down", volDownHandler);
    KeyboardJS.bind.key("down", function() {
        bttv.log("DOWN");
        Main.selectNextVideo(Main.DOWN);
    } );
    KeyboardJS.bind.key("up", function() {
        bttv.log("UP");
        Main.selectPreviousVideo(Main.UP);
    } );
    var enterKeyHandler = function() {
        bttv.log("ENTER");
        Main.toggleMode();
    };
    KeyboardJS.bind.key("enter", enterKeyHandler );
    KeyboardJS.bind.key("panel_enter", enterKeyHandler );
    KeyboardJS.bind.key("mute", function() {
        bttv.log("MUTE");
        Main.muteMode();
    } );
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
    
    Main.selectedVideo = (Main.selectedVideo + 1) % Data.getVideoCount();

    Main.updateCurrentVideo(down);
}

Main.selectPreviousVideo = function(up)
{
    Player.stopVideo();
    
    if (--Main.selectedVideo < 0)
    {
        Main.selectedVideo += Data.getVideoCount();
    }

    Main.updateCurrentVideo(up);
}

Main.setFullScreenMode = function()
{
    if (Main.mode != Main.FULLSCREEN)
    {
        Display.hide();
        
        Player.setFullscreen();
        
        Main.mode = Main.FULLSCREEN;
    }
}

Main.setWindowMode = function()
{
    if (Main.mode != Main.WINDOW)
    {
        Display.show();
        
        Player.setWindow();
        
        Main.mode = Main.WINDOW;
    }
}

Main.toggleMode = function()
{
    if(Player.getState() == Player.PAUSED)
    {
        Player.resumeVideo();
     }
    switch (Main.mode)
    {
        case Main.WINDOW:
            Main.setFullScreenMode();
            break;
            
        case Main.FULLSCREEN:
            Main.setWindowMode();
            break;
            
        default:
            bttv.log("ERROR: unexpected mode in toggleMode");
            break;
    }
}


Main.setMuteMode = function()
{
    if (Main.mute != Main.YMUTE)
    {
        var volumeElement = document.getElementById("volumeInfo");
		Audio.plugin.SetUserMute(true);
        document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/muteBar.png)";
        document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/mute.png)";
        bttv.widgetAPI.putInnerHTML(volumeElement, "MUTE");
        Main.mute = Main.YMUTE;
    }
}

Main.noMuteMode = function()
{
    if (Main.mute != Main.NMUTE)
    {
        Audio.plugin.SetUserMute(false);
		document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/volumeBar.png)";
        document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/volume.png)";
        Display.setVolume( Audio.getVolume() );
        Main.mute = Main.NMUTE;
    }
}

Main.muteMode = function()
{
    switch (Main.mute)
    {
        case Main.NMUTE:
            Main.setMuteMode();
            break;
            
        case Main.YMUTE:
            Main.noMuteMode();
            break;
            
        default:
            bttv.log("ERROR: unexpected mode in muteMode");
            break;
    }
}
