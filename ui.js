function afegeixScript(link) {
  var scr = document.createElement("script");
  scr.type = "text/javascript";
  scr.src = link;
  (document.head || document.body || document.documentElement).appendChild(scr);
}
afegeixScript("https://code.jquery.com/jquery-3.1.0.min.js");
afegeixScript(chrome.extension.getURL("main.js"));