<?php

function getDB() {
    $dbname = 'fe_myexpenses';
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    
    $dbConnection = new PDO('mysql:host='.$dbhost.';dbname='.$dbname, $dbuser, $dbpass); 
    
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    return $dbConnection;
}

?>