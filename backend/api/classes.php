<?php
//
//manage cores to allow sharing
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
header('Access-Control-Allow-Headers: *');
class dbase extends \PDO {

    //
    //The properties of this class are:-
    public $username = "timchis2";
    public $password = "Akmakm123.";
    public $dbname= "timchis2_adventures";

    //The tables of this database 
    public $tables;
    //
    //The constructor method to be called each time an instance of this class in made.
    public function __construct() {
        //
        //Set the dsn.
        $dsn = "mysql:host=timchistadventures.co.ke;dbname=$this->dbname";
        //
        //Parent constructor take a data source name.
        parent::__construct($dsn, $this->username, $this->password);
        //
        $this->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        
    }
    //
    //Returns a checked sql WHEN A QUERY HAS NO PARAMETERS!!!
    public function chk($sql) {
        //
        //A prepared pdo statment throws no exception even if it has errors
        $stmt = parent::prepare($sql);
        //
        //We have to exceited the query for pdo to throw exception if the
        //prepared statement has errors
        //
        try {
            //
            //This is the reason why this version works only with queries
            //without paramaters
            $stmt->execute();
            //
            $stmt->closeCursor();
            //
        } catch (\Exception $ex) {
            //
            throw new \Exception($ex->getMessage());
        }
        //
        //Return the same sql as the input
        return $sql;
    }

    //
    //Returns a result from a sql stmt.
    public function query ($sql) {
        //
        try {
            $result = parent::query($sql);
        } catch (\Exception $e) {
            //
            //Re-throw the exception
            throw $e;
        }
        //
        return $result;
    }

    //
    //Returns a result from a sql stmt.
    public function prepare($sql, $option = null) {
        //
        //
        //Check the sql
        $stmt = parent::prepare($sql);
        //
        //Check for errors
        if (!$stmt) {
            throw new \Exception($this->error . "<br/>$sql");
        }
        //
        //Return the perapered statement
        return $stmt;
    }

}