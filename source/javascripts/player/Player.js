var Player =
{
    plugin : null,
    state : -1,
    skipState : -1,
    stopCallback : null,    /* Callback function to be set by client */
    originalSource : null,
    
    STOPPED : 0,
    PLAYING : 1,
    PAUSED : 2,  
    FORWARD : 3,
    REWIND : 4
}

Player.init = function()
{
//console.log("***************bharat*****************Player.Init******************bhushan**********************");
    var success = true;
          bttv.log("init success vale :  " + success);
    this.state = this.STOPPED;
    
    this.plugin = document.getElementById("pluginPlayer");
    
//    console.log("***************bharat*****************"+this.plugin + "******************bhushan**********************");
    
    if (!this.plugin)
    {
          bttv.log("success vale this.plugin :  " + success);
         success = false;
    }
    
    bttv.log("init/2 success vale :  " + success);
    
    this.setWindow();
    
    bttv.log("setWindow success vale :  " + success);
    
    this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
    this.plugin.OnStreamInfoReady = 'Player.setTotalTime';
    this.plugin.OnBufferingStart = 'Player.onBufferingStart';
    this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
    this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';           
            
    bttv.log("init/end success vale :  " + success);
    return success;
}

Player.deinit = function()
{
      bttv.log("Player deinit !!! " );
      
      if (this.plugin)
      {
            this.plugin.Stop();
      }
}

Player.setWindow = function()
{
    this.plugin.SetDisplayArea(458, 58, 472, 270);
}

Player.setFullscreen = function()
{
    this.plugin.SetDisplayArea(0, 0, 960, 540);
}

Player.setVideoURL = function(url)
{
    this.url = url;
    bttv.log("URL = " + this.url);
}

Player.playVideo = function()
{
    if (this.url == null)
    {
        bttv.log("No videos to play");
    }
    else
    {
        this.state = this.PLAYING;
        document.getElementById("play").style.opacity = '0.2';
        document.getElementById("stop").style.opacity = '1.0';
        document.getElementById("pause").style.opacity = '1.0';
        document.getElementById("forward").style.opacity = '1.0';
        document.getElementById("rewind").style.opacity = '1.0';
        Display.status("Play");
        this.setWindow();
        this.plugin.Play( this.url );
        Audio.plugin.SetSystemMute(false); 
    }
}

Player.pauseVideo = function()
{
    this.state = this.PAUSED;
    document.getElementById("play").style.opacity = '1.0';
    document.getElementById("stop").style.opacity = '1.0';
    document.getElementById("pause").style.opacity = '0.2';
    document.getElementById("forward").style.opacity = '0.2';
    document.getElementById("rewind").style.opacity = '0.2';
    Display.status("Pause");
    this.plugin.Pause();
}

Player.stopVideo = function()
{
    if (this.state != this.STOPPED)
    {
        this.state = this.STOPPED;
        document.getElementById("play").style.opacity = '1.0';
        document.getElementById("stop").style.opacity = '0.2';
        document.getElementById("pause").style.opacity = '0.2';
        document.getElementById("forward").style.opacity = '0.2';
        document.getElementById("rewind").style.opacity = '0.2';
        Display.status("Stop");
        this.plugin.Stop();
        Display.setTime(0);
        
        if (this.stopCallback)
        {
            this.stopCallback();
        }
    }
    else
    {
        bttv.log("Ignoring stop request, not in correct state");
    }
}

Player.resumeVideo = function()
{
    this.state = this.PLAYING;
    document.getElementById("play").style.opacity = '0.2';
    document.getElementById("stop").style.opacity = '1.0';
    document.getElementById("pause").style.opacity = '1.0';
    document.getElementById("forward").style.opacity = '1.0';
    document.getElementById("rewind").style.opacity = '1.0';
    Display.status("Play");
    this.plugin.Resume();
}

Player.skipForwardVideo = function()
{
    this.skipState = this.FORWARD;
    this.plugin.JumpForward(5);    
}

Player.skipBackwardVideo = function()
{
    this.skipState = this.REWIND;
    this.plugin.JumpBackward(5);
}

Player.getState = function()
{
    return this.state;
}

// Global functions called directly by the player 

Player.onBufferingStart = function()
{
    Display.status("Buffering...");
    switch(this.skipState)
    {
        case this.FORWARD:
            document.getElementById("forward").style.opacity = '0.2';
            break;
        
        case this.REWIND:
            document.getElementById("rewind").style.opacity = '0.2';
            break;
    }
}

Player.onBufferingProgress = function(percent)
{
    Display.status("Buffering:" + percent + "%");
}

Player.onBufferingComplete = function()
{
    Display.status("Play");
    switch(this.skipState)
    {
        case this.FORWARD:
            document.getElementById("forward").style.opacity = '1.0';
            break;
        
        case this.REWIND:
            document.getElementById("rewind").style.opacity = '1.0';
            break;
    }
}

Player.setCurTime = function(time)
{
    Display.setTime(time);
}

Player.setTotalTime = function()
{
    Display.setTotalTime(Player.plugin.GetDuration());
}

onServerError = function()
{
    Display.status("Server Error!");
}

OnNetworkDisconnected = function()
{
    Display.status("Network Error!");
}

getBandwidth = function(bandwidth) { bttv.log("getBandwidth " + bandwidth); }

onDecoderReady = function() { bttv.log("onDecoderReady"); }

onRenderError = function() { bttv.log("onRenderError"); }

stopPlayer = function()
{
    Player.stopVideo();
}

setTottalBuffer = function(buffer) { bttv.log("setTottalBuffer " + buffer); }

setCurBuffer = function(buffer) { bttv.log("setCurBuffer " + buffer); }
