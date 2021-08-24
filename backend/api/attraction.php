<?php
//
//manage cores to allow sharing
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//
//
//Get all details from angular request. We want destination primary key
$desData = json_decode(file_get_contents("php://input"));
//
//Get the destination primary key from the desData
$destinationPk=$_GET['destination'];

//Returns a list of all destinations
require_once 'config.php';
//
$sql = "SELECT 
            attraction.attraction,
            attraction.name,
            attraction.description,
            destination.destination
        FROM 
            attraction 
        Inner Join 
            destination on attraction.destination=destination.destination
        WHERE 
            `destination`.`destination` = '$destinationPk'";
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
