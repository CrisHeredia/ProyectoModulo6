<?php
  $data_readed = file_get_contents("./data-1.json");
  $data = json_decode($data_readed, true);
  $ciudad =  $_COOKIE["varCiudad"];
  $tipo = $_COOKIE["varTipo"];
  $precio = $_COOKIE["varPrecio"];
  foreach($data as $propiedad){
    if ($propiedad["Ciudad"] == $ciudad){
      echo "<div class='card-left card row'>";
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
      echo "<div class='divider'>";
      echo "</div>";
      echo "<div class='VerMas'>Ver mas</div>";
      echo "</div>";
      echo "</div>";
    }
  }
?>
