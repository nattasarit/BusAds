<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$servername = "localhost:3306";
$username = "root";
$password = "root";
$dbname = "BUSADS";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = array();
$count = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $REL_PROJ_ID = htmlspecialchars($_POST["REL_PROJ_ID"]);
	$IMAGE_A = htmlspecialchars($_POST["IMAGE_A"]);
	$IMAGE_B = htmlspecialchars($_POST["IMAGE_B"]);
    $IMAGE_C = htmlspecialchars($_POST["IMAGE_C"]);
    

    //$sql = "UPDATE REL_PROJECT SET IMAGE_A = '" . $IMAGE_A . "' WHERE REL_PROJ_ID LIKE '" . $REL_PROJ_ID ."'";
    $sql = "UPDATE REL_PROJECT SET IMAGE_A = '" . $IMAGE_A . "' , IMAGE_B = '" . $IMAGE_B . "' , IMAGE_C = '" . $IMAGE_C . "' WHERE REL_PROJ_ID = '" . $REL_PROJ_ID ."'";
    //$sql = "UPDATE REL_PROJECT SET IMAGE_A = 'CCC' WHERE REL_PROJ_ID = '2'";
    
    $result = mysqli_query($conn, $sql);

    $obj = new stdClass();
    $obj->data = 'aaa';
    $obj->message = $sql;
    $obj->success = true;

    echo json_encode($obj);
    mysqli_close($conn);  

}

?>