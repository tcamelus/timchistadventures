<?php
phpinfo();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//
//Define the connection
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DataBase', 'tim_adventures');
//
//Create connection to dbase and test success or failure
function connect()
{
  $connect = mysqli_connect(HOST ,USER ,PASSWORD ,DataBase);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();


