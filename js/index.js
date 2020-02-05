//Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

//Función que inicializa el elemento Slider
function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}

//Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

function seleccionarCiudad(data){
  var arrayCiudad = [];
  $.each(data,function(indice,elemento){
    var ciudad = elemento.Ciudad;
    var idx = arrayCiudad.indexOf(ciudad);
    if(idx == -1){
      var insertar="<option value='"+ciudad+"'>"+ciudad+"</option>";
      $("#selectCiudad").append(insertar);
      arrayCiudad.push(ciudad);
    }
  });
  return arrayCiudad;
}

function seleccionarTipo(data){
  var arrayTipo = [];
  $.each(data,function(indice,elemento){
    var tipo = elemento.Tipo;
    var idx = arrayTipo.indexOf(tipo);
    if(idx == -1){
      var insertar="<option value='"+tipo+"'>"+tipo+"</option>";
      $("#selectTipo").append(insertar);
      arrayTipo.push(tipo);
    }
  });
  return arrayTipo;
}

$(document).ready(function(event){
  $.ajax({
    url: "./data-1.json",
    type: "POST",
    cache: false,
    success: function(data){
      seleccionarCiudad(data);
      seleccionarTipo(data);
      $("#selectCiudad").show();
      $("#selectTipo").show();
    },
    error: function(data){
      console.log("error");
    }
  });
})

function borrarElementos(){
  var propiedad = document.getElementById("conPropiedad");
  if (propiedad != null) {
    document.getElementById("conPropiedad").remove();
  }
}

$('#mostrarTodos').click(function(event){
  event.preventDefault();
  borrarElementos();
  $.ajax({
    url: "./data-1.json",
    type: "POST",
    cache: false,
    success: function(data){
      console.log("datos cargados correctamente");
      var conPropiedad="<div class='card-left card row' id='conPropiedad'></div>";
      $(".colContenido").append(conPropiedad);
      $.each(data,function(indice,elemento){
        var insertar="<div class='col s3'><img class='imagen' src='img/home.jpg'/></div><div class='col s9'><div>Dirección: "+elemento.Direccion+"</div><div>Ciudad: "+elemento.Ciudad+"</div><div>Teléfono: "+elemento.Telefono+"</div><div>Código_Postal: "+elemento.Codigo_Postal+"</div><div>Tipo: "+elemento.Tipo+"</div><div>Precio: "+elemento.Precio+"</div><div class='VerMas'>Ver mas</div><div class='divider'></div>";
        $("#conPropiedad").append(insertar);
      });
    },
    error: function(data){
      console.log("error");
    }
  });
})

$('#formulario').submit(function(event){
  event.preventDefault();
  borrarElementos();
  var ciudad = $('form').find('select[name="ciudad"]').val();
  document.cookie ='varCiudad='+ciudad+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/';
  var tipo = $('form').find('select[name="tipo"]').val();
  document.cookie ='varTipo='+tipo+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/';
  var precio = $('form').find('input[name="precio"]').val();
  var posIndice = precio.indexOf(';');
  var precioInicial = precio.substring(0,posIndice);
  var precioFinal = precio.substring(posIndice+1,precio.length);
  document.cookie ='varPrecioInicio='+precioInicial+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/';
  document.cookie ='varPrecioFinal='+precioFinal+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/';
  $.ajax({
    url: "./buscador.php",
    //dataType: "json",
    //cache: false,
    //contentType: false,
    //processData: false,
    type: "POST",
    success: function(data){
      $(".colContenido").append(data);
    },
    error: function(data){
      console.log("error");
    }
  });
})
