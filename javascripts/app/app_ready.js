((function(){bttv.AppReady=function(){return bttv.log("App Ready!"),document.getElementById("app_stylesheet1").href=""+bttv.station.get("content_url_root")+"/css/Main.css",document.getElementById("app_stylesheet2").href=""+bttv.station.get("content_url_root")+"/css/app.css",bttv.station_controller=new bttv.StationController,bttv.setupKeymapping(),$("#intro-image").fadeOut(1e3,function(){return bttv.station_controller.handleShowStations()})}})).call(this)