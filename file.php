<?php
  $data = $_POST['data'];
  $name= $_POST['filename'];
  
  $file = fopen($name,"w");
  fwrite($file, $data);
  fclose($file);
  echo $data;
?> 

