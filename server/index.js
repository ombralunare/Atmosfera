

// load :: required : libraries
// ----------------------------------------------------------------------------
    const http = require("http");
    const disc = require("fs");
    const mule = require("child_process");

// ----------------------------------------------------------------------------




// tool :: Server : web-server
// ----------------------------------------------------------------------------
    class Server
    {
        memory = {}
        config =
        {
            addr: "0.0.0.0",
            port: 2750,
            mlib: "~/Music",
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
        }



        constructor()
        {
            var myself = this;
            myself.driver = http.createServer(function handler(req, rsp)
            {
                if (req.method == "GET")
                {
                    myself.select(req.url, rsp);
                    return;
                };

                // TO-DO :: POST : upload songs/files
            });

            myself.driver.listen(myself.config.port, myself.config.addr);
        }



        select(url, rsp)
        {
            if (url == "/"){ url = "/index.html" };

            let ext = url.split(".").pop();
            let mlp = this.config.mlib;
            let pub = ((__dirname).split("/server")[0] + "/client");
            let pth = (url.startsWith(mlp) ? url : (pub+url));

            // console.log(pth);    // for debugging

            if (!disc.existsSync(pth))
            {
                rsp.statusCode = 404; rsp.end(); return;
            };

            rsp.statusCode = 200;
            let dir = disc.statSync(pth).isDirectory();

            if (dir)
            {
                let dir = disc.readdir(pth);
                let txt = JSON.stringify(dir);

                rsp.setHeader("Content-type", "application/json");
                rsp.end(txt); return;
            };


            let mimetype = this.config.mime[ext];
            rsp.setHeader("Content-type", mimetype);
            rsp.end( disc.readFileSync(pth) );
        }
    }
// ----------------------------------------------------------------------------




// init :: Server : now
// ----------------------------------------------------------------------------
    let host = new Server();
// ----------------------------------------------------------------------------
