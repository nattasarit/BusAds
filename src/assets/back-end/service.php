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
if($method == "LUT_PROJECT_Q"){
    $sql = "SELECT * FROM LUT_PROJECT";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $data[$count]['PROJ_ID']    = $row['PROJ_ID'];
            $data[$count]['PROJ_VALUE'] = $row['PROJ_VALUE'];
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
        $obj->message = 'error LUT_PROJECT_Q';
        echo json_encode($obj);
    }
    mysqli_close($conn);  
}
if($method == "CUS_PROJECT_Q"){
    $sql = "SELECT * FROM CUS_PROJECT C LEFT JOIN REL_PROJECT R ON C.CUS_PROJ_ID = R.CUS_PROJ_ID";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $data[$count]['CUS_PROJ_ID']    = $row['CUS_PROJ_ID'];
            $data[$count]['CUS_PROJ_NAME'] = $row['CUS_PROJ_NAME'];
            $data[$count]['CUS_PROJ_TYPE'] = $row['CUS_PROJ_TYPE'];
            $data[$count]['REL_PROJ_ID'] = $row['REL_PROJ_ID'];
            $data[$count]['IMAGE_A'] = $row['IMAGE_A'];
            $data[$count]['IMAGE_B'] = $row['IMAGE_B'];
            $data[$count]['IMAGE_C'] = $row['IMAGE_C'];
            $data[$count]['TEXT_A'] = $row['TEXT_A'];
            $data[$count]['TEXT_B'] = $row['TEXT_B'];
            $data[$count]['TEXT_B'] = $row['TEXT_B'];
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
        $obj->message = 'error LUT_PROJECT_Q';
        echo json_encode($obj);
    }
    mysqli_close($conn);  
}
if($method == "CUS_PROJECT_I"){
    $CUS_PROJ_NAME = htmlspecialchars($_GET["CUS_PROJ_NAME"]);
    $CUS_PROJ_TYPE = htmlspecialchars($_GET["CUS_PROJ_TYPE"]);

    $sql = "INSERT INTO CUS_PROJECT (CUS_PROJ_NAME, CUS_PROJ_TYPE) VALUES('" . $CUS_PROJ_NAME . "','" . $CUS_PROJ_TYPE . "');";
    $result = mysqli_query($conn, $sql);

    $sql = "SELECT CUS_PROJ_ID FROM CUS_PROJECT WHERE CUS_PROJ_NAME LIKE '" . $CUS_PROJ_NAME . "'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $data[$count]['CUS_PROJ_ID']    = $row['CUS_PROJ_ID'];
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
        $obj->message = 'error CUS_PROJECT_I';
        echo json_encode($obj);
    }
    mysqli_close($conn);  
}
if($method == "REL_PROJECT_I"){
    $CUS_PROJ_ID = htmlspecialchars($_GET["CUS_PROJ_ID"]);

    $sql = "INSERT INTO REL_PROJECT (CUS_PROJ_ID) VALUES('" . $CUS_PROJ_ID . "');";
    $result = mysqli_query($conn, $sql);

    $obj = new stdClass();
    $obj->data = 'aaa';
    $obj->success = true;
    $obj->message = $sql;

    echo json_encode($obj);
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
    mysqli_close($conn);  
}



?>