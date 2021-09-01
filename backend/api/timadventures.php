<?php
//
//
// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] 
    //is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    //Allow supported requests
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); 

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}
//From here, handle the request as it is ok
//
//manage cores to allow sharing
// header('@CrossOrigin(origins="*", allowedHeaders = "*")');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// header("Access-Control-Allow-Headers: *");
//
//
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

//
//get the class for dbase connection
require_once "classes.php";
//
//class timAdventures manages the planning component of the program
class timAdventures extends dbase{
    //
    //Get the destination primary key from the destination data retrieved 
    public string $destinationPk;
    //
    public function __construct(){
        parent:: __construct();
    }
    //
    //return the data retrieved in an sql
    function sqlData($sql){
      //  
      $result = $this->query($sql);
      //
      //
      if (!$result) {
        print "<p>Could not retrieve data: </p>";
      }
      while ($row = $result->fetchAll()) {
        $data = $row;
        return json_encode($data);
      }
    }
    //
    //return all destinations available 
    function destination(){
      $sql= $this->chk(
            "select * from destination "
        );
        $destination= $this->sqlData($sql);
        echo ($destination);
    }
    //
    //return the attractions in a destination using destinationPK
    function attractions(){
      // 
      //Get the selected destination 
      if(isset($_REQUEST['destination'])){
        $destination=$_REQUEST['destination'];
      }
      //
      //Die if no destination is provided
      else{
        throw new Exception("No destination found");
      }
      //
      //
      //return the attractions using the destination primary key
      $sql= $this->chk(
        "SELECT 
            attraction.attraction,
            attraction.name,
            attraction.description,
            destination.destination
        FROM 
            attraction 
        Inner Join 
            destination on attraction.destination=destination.destination
        WHERE 
            `destination`.`destination` = $destination"
      );
        //
        $attraction= $this->sqlData($sql);
        echo ($attraction);
    }
    //
    //return the services in an attraction using attractionPK
    function services (){
      // 
      //Get the selected destination 
      if(isset($_REQUEST['attraction'])){
        $attraction=$_REQUEST['attraction'];
      }
      //
      //Die if no destination is provided
      else{
        throw new Exception("No attraction found");
      }
      //
      //
      //return the attractions using the destination primary key
      $sql= $this->chk(
        "SELECT 
              services.services,
              services.name,
              attraction.attraction
          FROM 
              services 
          Inner Join 
              atservice on atservice.services=services.services
          Inner Join
              attraction on atservice.attraction=attraction.attraction
          WHERE 
            `attraction`.`attraction` = $attraction"
      );
      // 
      $service= $this->sqlData($sql);
      echo ($service); 
    }
    //
    //return all car_hire services
    function car_hire(){
      //
      $sql= $this->chk(
        "SELECT 
              vehicle.reg_no,
              vehicle.model,
              vehicle.rate
          FROM 
              vehicle "
      );
      // 
      $car_hire= $this->sqlData($sql);
      echo ($car_hire);
    }
    //
    //return all eateries services
    function eateries(){
      $sql= $this->chk(
        "SELECT 
              eatery.name,
              eatery.description,
              eatery.rate
          FROM 
              eatery "
      );
      // 
      $eateries= $this->sqlData($sql);
      echo ($eateries);
    }
    //
    //retuan all tour activities service
    function activities(){
      $sql= $this->chk(
        "SELECT 
              activity.name,
              activity.description,
              activity.rate
          FROM 
              activity "
      );
      // 
      $activity= $this->sqlData($sql);
      echo ($activity);

    }
    //
    //return all guides available 
    function guide(){
      $sql= $this->chk(
        "SELECT 
              guide.name,
              guide.description,
              guide.rate
          FROM 
              guide "
      );
      // 
      $guide= $this->sqlData($sql);
      echo ($guide);
    }
    //
    //return all the accommodation services
    function accommodation(){
      $sql= $this->chk(
        "SELECT 
              accommodation.name,
              accommodation.description,
              acccomodation.rate
          FROM 
              accommodation "
      );
      // 
      $accomodation= $this->sqlData($sql);
      echo ($accomodation);
    }
    //
    //return all services in a service selected in an attraction
    function getServiceDetails(){
      //
      //
      $attraction= $_GET['attraction'];
      $services= $_GET['service'];
      $sql= $this->chk(
        "select 
          json_object('destination', destination.name, 'attraction', attraction.name, 'name',accommodation.name, 'rate',accommodation.rate,'description',accommodation.description) as accommodation,
          json_object('destination', destination.name, 'attraction', attraction.name,'name',activity.name,'rate',activity.rate,'description',activity.description) as activity,
          json_object('destination', destination.name, 'attraction', attraction.name,'name',guide.name,'rate',guide.rate,'description',guide.description) as guide,
          json_object('destination', destination.name, 'attraction', attraction.name,'name',eatery.name,'rate',eatery.rate,'description',eatery.description) as eatery,
          json_object('destination', destination.name, 'attraction', attraction.name,'name',vehicle.model,'rate',vehicle.rate,'description',vehicle.reg_no) as vehicle
      from 
        services
          LEFT JOIN accommodation ON accommodation.services= services.services
          LEFT JOIN activity ON services.services = activity.services
          LEFT JOIN guide ON guide.services = services.services
          LEFT JOIN eatery on eatery.services= services.services
          LEFT JOIN vehicle on vehicle.service= services.services
          INNER JOIN atservice on atservice.services= services.services
          INNER JOIN attraction on attraction.attraction=atservice.attraction
          INNER JOIN destination on destination.destination=attraction.destination
      where 
        attraction.attraction =$attraction 
      AND 
      services.services= $services "
      );
      // 
      //filter the result to return what we are after 
      $type = $_REQUEST['type'];
      //
      $result = $this->query($sql);
      //
      //
      if (!$result) {
        print "<p>Could not retrieve data: </p>";
      }
      $row = $result->fetchAll(PDO::FETCH_ASSOC);
      $res=[];
        foreach ($row as  $value) {
          foreach ($value as $key => $data) {
            //
            //return data associated with the type of service clicked
            if($key===$type) {
              $res[]=json_decode($data);
            }
          }
        }
        echo json_encode($res);
    }
}
//
//establish a new instance of timAdventures
$timAdventures =new timAdventures();
// 
//Get the method to execute 
if(isset($_GET['method'])){$method=$_GET['method'];}
else{throw new Exception("method to run not found");}
$timAdventures->$method();