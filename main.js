  var body = document.getElementsByTagName("body")[0];
  var head = document.getElementsByTagName("head")[0];

  $(document).ready(function() {
    var type, codi;
    $("#contenidor_megabanner").remove();
    transformar = function(str) {
      if ((str.indexOf("ccma") != -1) && (str.indexOf("/video/") != -1) && (str.indexOf("embed/") === -1)) {
        codi = str.substring(str.lastIndexOf("/video/") + 7, str.lastIndexOf("/"));
        type = "video";
      } else if ((str.indexOf("ccma") != -1) && (str.indexOf("/embed/")) != -1) {
        codi = str.substring(str.lastIndexOf("/embed/") + 7, str.length);
        type = "video";
      } else if ((str.indexOf("ccma") != -1) && (str.indexOf("/audio/") != -1) && (str.indexOf("embed/") === -1)) {
        codi = str.substring(str.lastIndexOf("/audio/") + 7, str.lastIndexOf("/"));
        type = "audio";
      }
      return "http://dinamics.ccma.cat/pvideo/media.jsp?media=" + type + "&version=0s&idint=" + codi;
    };
    var url = transformar(window.location + "");
    var dw;
    $.ajax({
      url: 'http://marcpujolgualdo.cat/tv3/index.php',
      type: "POST",
      data: {
        url: url
      },
      success: function(data_b) {
        var data = JSON.parse(data_b);
        dw = data.media.url;
        if (data.media.url.length) {
          dw = data.media.url[data.media.url.length - 1].file;
        }
        $(".F-mediaPrincipal").empty().html("<video controls width='100%'><source src='" + dw + "' type='video/mp4'></video>");
        var div = document.createElement("div");
        div.id = "descarregar_marc";
        body.appendChild(div);
        $("#descarregar_marc").html("<h1>" + data.informacio.titol + "</h1><img alt='imatge' src='" + data.imatges.url + "'><p>" + data.informacio.durada.text + " | " + data.informacio.data_emissio.text + "<br>" + data.informacio.programa + " | " + data.informacio.tematica.text + "</p><a href='" + dw + "' download target='_blank'><button id='descarregar_marc_btn'>Descarregar vídeo</button></a>");
        $(".botonsMes").append("<div class='R-linkMes'><a id='dtv31' href='" + dw + "' download target='_blank' title='DESCARREGA'>DESCARREGA</a></div>");
        $(".R-itemvideoInfo .titol").after("<a id='dtv32' href='" + dw + "' download target='_blank' title='DESCARREGA'>DESCARREGA</a>");
        $(".F-infoPrograma .F-dataCompartir").append("");
      },
      error: function(error) {
        alert("Error descarregant el video\n" + error.statusText);
      }
    });
  });