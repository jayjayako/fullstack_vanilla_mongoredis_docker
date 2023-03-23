///////////////////////// import new css //////////////////////////////////
function loadallcss(filename) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = filename;

  document.getElementsByTagName("head")[0].appendChild(link);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////// import js defer /////////////////////////////////
function loadalljavascript(filename) {
  var script = document.createElement("script");
  script.src = filename;
  script.defer = "defer";
  document.getElementsByTagName("head")[0].appendChild(script);
}
///////////////////////////////////////////////////////////////////////////
