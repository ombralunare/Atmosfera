

// load :: http : module .. for low-level stream-handling over http protocol
// ----------------------------------------------------------------------------
    const http = require("http");
// ----------------------------------------------------------------------------



// load :: disk : module .. for interacting with the File Systems (POSI)
// ----------------------------------------------------------------------------
    const disk = require("fs");
// ----------------------------------------------------------------------------



//load :: mule : module for spawning child/sub -processes e.g. BASH
// ----------------------------------------------------------------------------
    const mule = require("child_process");
// ----------------------------------------------------------------------------



// load :: info : object that contains info about user running current script
// ----------------------------------------------------------------------------
    const info = require("os").userInfo();
// ----------------------------------------------------------------------------




// class :: Server : web-server
// ----------------------------------------------------------------------------
    class Server
    {
    // object :: memory : keeps record of values contained in the Server instance
    // ------------------------------------------------------------------------
        memory = {}
    // ------------------------------------------------------------------------



    // object :: config : holds default configuration that may change...
    // ------------------------------------------------------------------------
        config =
        {
        // misc
        // --------------------------------------------------------------------
            addr: "0.0.0.0",    // address to listen on
            port: 2750,         // port to listen on
            mlib: ("/home/" + info.username + "/Music"), // music library path
        // --------------------------------------------------------------------


        // mime :: multipurpose internet mail extension used to identify data
        // --------------------------------------------------------------------
            mime:
            {
                "3gp" : "video/3gpp",
                   au : "audio/basic",
                  avi : "video/x-msvideo",
                  bin : "application/octet-stream",
                  bmp : "image/bmp",
                  crt : "application/x-x509-ca-cert",
                  css : "text/css",
                  csv : "text/csv",
                 fold : "inode/directory",
                 file : "file/unknown",
                 none : "none/undefined",
                 flac : "audio/x-flac",
                  fnt : "text/css",
                  gif : "image/gif",
                   gz : "application/gzip",
                  htm : "text/html",
                 html : "text/html",
                  ico : "image/x-icon",
                  ics : "text/calendar",
                  img : "image/png",
                  inf : "text/plain",
                  iso : "application/x-iso9660-image",
                  jar : "application/java-archive",
                 jpeg : "image/jpeg",
                  jpg : "image/jpeg",
                   js : "application/javascript",
                  jsm : "application/javascript",
                  jso : "application/json",
                 json : "application/json",
                 link : "relay/link",
                   md : "text/x-markdown",
                  mkv : "video/x-matroska",
                 mobi : "application/x-mobipocket-ebook",
                  mp3 : "audio/mpeg",
                  mp4 : "video/mp4",
                 mpeg : "video/mpeg",
                  oga : "audio/ogg",
                  ogg : "audio/ogg",
                  ogv : "video/ogg",
                  ogx : "application/ogg",
                  otf : "application/x-font-otf",
                  pdf : "application/pdf",
                  png : "image/png",
                  php : "application/x-httpd-php",
                  sdb : "application/database",
                  snd : "audio/ogg",
                  sql : "application/sql",
                  svg : "image/svg+xml",
                 svgz : "image/svg+xml",
                  swf : "application/x-shockwave-flash",
                  ttf : "application/x-font-ttf",
                  txt : "text/plain",
                  uri : "text/uri-list",
                  url : "plug/link",
                  vmp : "text/vamp",
                  vcf : "text/x-vcard",
                  vcs : "text/x-vcalendar",
                  wav : "audio/x-wav",
                 weba : "audio/webm",
                 webm : "video/webm",
                 webp : "image/webp",
                 woff : "application/font-woff",
                woff2 : "application/font-woff2",
                  xml : "application/xml",
                  zip : "application/zip",
                webmanifest : "application/json",
            },
        // --------------------------------------------------------------------
        }
    // ------------------------------------------------------------------------



    // method :: constructor : initiates Server object
    // ------------------------------------------------------------------------
        constructor()
        {
            var myself = this;  // reference to current instance
            var handle = function handle(req, rsp)  // request handler
            {
                if (req.method == "GET")    // retrieves http request url
                {
                    myself.select(req.url, rsp);    // response is 'info'
                    return;
                };
            };

            myself.driver = http.createServer(handle);  // server instance
            myself.driver.listen(myself.config.port, myself.config.addr);
        }
    // ------------------------------------------------------------------------



    // method :: select : serves file(s) requested by http using GET method
    // ------------------------------------------------------------------------
        select(url, rsp)
        {
            if (url == "/"){url = "/index.html"}
            else if (url.startsWith("/~/"))
            {
                url = ("/home/" + info.username + url.slice(2));  //
            };

            let ext = url.split(".").pop(); //
            let mlp = this.config.mlib; // reference to music library path
            let pub = ((__dirname).split("/server")[0] + "/client");    //
            let pth = (url.startsWith(mlp) ? url : (pub+url));  // specify path

            // console.log(pth);    // for debugging

            if (!disk.existsSync(pth))
            {
                console.log("NO EXIST!");   // throws console.error();
                rsp.statusCode = 404; rsp.end(); return;
            };

            rsp.statusCode = 200;
            let dir = disk.statSync(pth).isDirectory();

            if (dir)
            {
                let dir = disk.readdirSync(pth);
                let txt = JSON.stringify(dir);

                rsp.setHeader("Content-type", "application/json");  // mimetype
                rsp.end(txt); return;
            };


            let mimetype = this.config.mime[ext];
            rsp.setHeader("Content-type", mimetype);
            rsp.end(disk.readFileSync(pth));
        }
    // ------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------




// init :: Server : now
// ----------------------------------------------------------------------------
    let host = new Server();    // voila! A Server
// ----------------------------------------------------------------------------
