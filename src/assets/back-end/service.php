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

$method = htmlspecialchars($_GET["METHOD"]);
$data = array();
$count = 0;

if($method == "BUS_MAINFRAME_Q"){
    $sql = "SELECT * FROM BUS_MAINFRAME";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $data[$count]['BUS_MF_ID']    = $row['BUS_MF_ID'];
            $data[$count]['BUS_MF_NAME'] = $row['BUS_MF_NAME'];
            $data[$count]['BUS_MF_COMMAND'] = $row['BUS_MF_COMMAND'];
            $count++;
        }

        $obj = new stdClass();
        $obj->data = $data;
        $obj->success = true;
        $obj->message = '';

        echo json_encode($obj);
    } else {
        $obj = new stdClass();
        $obj->data = $data;
        $obj->success = false;
        $obj->message = 'error BUS_MAINFRAME_Q';
        echo json_encode($obj);
    }
    mysqli_close($conn);  
}
else if($method == "BUS_TEMPLATE_Q"){
    $sql = "SELECT * FROM BUS_TEMPLATE";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $data[$count]['BUS_TEM_ID']    = $row['BUS_TEM_ID'];
            $data[$count]['BUS_TEM_NAME'] = $row['BUS_TEM_NAME'];
            $data[$count]['BUS_TEM_MF_ID'] = $row['BUS_TEM_MF_ID'];
            $data[$count]['BUS_TEM_COMMAND_A'] = $row['BUS_TEM_COMMAND_A'];
            $data[$count]['BUS_TEM_COMMAND_B'] = $row['BUS_TEM_COMMAND_B'];
            $data[$count]['BUS_TEM_COMMAND_C'] = $row['BUS_TEM_COMMAND_C'];
            $count++;
        }

        $obj = new stdClass();
        $obj->data = $data;
        $obj->success = true;
        $obj->message = '';

        echo json_encode($obj);
    } else {
        $obj = new stdClass();
        $obj->data = $data;
        $obj->success = false;
        $obj->message = 'error BUS_TEMPLATE_Q';
        echo json_encode($obj);
    }
    mysqli_close($conn);  
}
else if($method == "BUS_TEMPLATE_I"){
    $MF = htmlspecialchars($_GET["MF"]);
    $NAME = htmlspecialchars($_GET["NAME"]);
    $A = htmlspecialchars($_GET["A"]);
    $B = htmlspecialchars($_GET["B"]);
    $C = htmlspecialchars($_GET["C"]);

    $sql = "INSERT INTO BUS_TEMPLATE (BUS_TEM_NAME, BUS_TEM_MF_ID, BUS_TEM_COMMAND_A, BUS_TEM_COMMAND_B, BUS_TEM_COMMAND_C) VALUES('" . $NAME . "','" . $MF . "','" . $A . "','" . $B . "','" . $C . "');";

    //$sql = "INSERT INTO BUS_TEMPLATE (BUS_TEM_NAME, BUS_TEM_MF_ID, BUS_TEM_COMMAND_A, BUS_TEM_COMMAND_B, BUS_TEM_COMMAND_C) VALUES('aaa','bbb','ccc','ddd','eee');";
    
    $result = mysqli_query($conn, $sql);


    

    $obj = new stdClass();
    $obj->data = 'aaa';
    $obj->success = true;
    $obj->message = $sql;

    echo json_encode($obj);
}


?>