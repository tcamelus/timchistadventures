<?php
//
//manage cores to allow sharing
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//
//Returns a list of all destinations
require_once 'config.php';


$sql = "SELECT * FROM destination";
$destinations = [];
$result = mysqli_query($con,$sql);
//
if ($result->num_rows > 0) {
// output data of each row
    while($row = $result->fetch_assoc()) {
        $destinations[] = $row;
    }
    echo json_encode($destinations);
 } 
 else 
 {
     //echo "0 results";
 }