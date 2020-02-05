<?php
  function imprimirDatos($propiedad){
    echo "<div class='col s3'>";
    echo "<img class='imagen' src='img/home.jpg'/>";
    echo "</div>";
    echo "<div class='col s9'>";
    echo "<div>Dirección: $propiedad[Direccion]</div>";
    echo "<div>Ciudad: $propiedad[Ciudad]</div>";
    echo "<div>Teléfono: $propiedad[Telefono]</div>";
    echo "<div>Código_Postal: $propiedad[Codigo_Postal]</div>";
    echo "<div>Tipo: $propiedad[Tipo]</div>";
    echo "<div>Precio: $propiedad[Precio]</div>";
    echo "<div class='VerMas'>Ver mas</div>";
    echo "<div class='divider'></div>";
    echo "</div>";
  }

  $data_readed = file_get_contents("./data-1.json");
  $data = json_decode($data_readed, true);
  $ciudad =  $_COOKIE["varCiudad"];
  $tipo = $_COOKIE["varTipo"];
  $precioInicio = $_COOKIE["varPrecioInicio"];
  $precioFinal = $_COOKIE["varPrecioFinal"];
  echo "<div class='card-left card row' id='conPropiedad'>";
  foreach($data as $propiedad){
    $precio = str_replace(",","",ltrim($propiedad['Precio'],"$"));
    if ($ciudad === "" && $tipo === ""){
      if ($precio >= $precioInicio && $precio <= $precioFinal) {
        imprimirDatos($propiedad);
      }
    }
    if ($ciudad != "" && $tipo != ""){
      if ($precio >= $precioInicio && $precio <= $precioFinal && $propiedad['Ciudad'] === $ciudad && $propiedad['Tipo'] === $tipo) {
        imprimirDatos($propiedad);
      }
    }
    if ($ciudad != "" && $tipo == ""){
      if ($precio >= $precioInicio && $precio <= $precioFinal && $propiedad['Ciudad'] === $ciudad) {
        imprimirDatos($propiedad);
      }
    }
    if ($ciudad == "" && $tipo != ""){
      if ($precio >= $precioInicio && $precio <= $precioFinal && $propiedad['Tipo'] === $tipo) {
        imprimirDatos($propiedad);
      }
    }

  }
  echo "</div>";
?>
