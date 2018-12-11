<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$servername = "http://localhost:3306/";
$username = "root";
$password = "root";
$dbname = "BUSADS";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}



$sql = "SELECT * FROM BUS_TEMPLATE";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        // echo "__ng_jsonp__.__req0.finished({BUS_TEM_ID: " . $row["BUS_TEM_ID"]. ", BUS_TEM_NAME: " . $row["BUS_TEM_NAME"]. " " . $row["BUS_TEM_COMMANDLIST"]. "})";
    }
    echo "{BUS_TEM_ID: 'AAA'}";
} else {
    echo "{BUS_TEM_ID: 'results'}";
}

mysqli_close($conn);  
?>