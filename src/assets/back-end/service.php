<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

//$mysqli = new mysqli("sql12.freemysqlhosting.net", "sql12238501", "JXLue2Ylz2", "sql12238501");
//$mysqli = new mysqli("127.0.0.1", "root", "1234", "sys");
$outp = "Hello";
echo($outp);

/*
$result = $conn->query("SELECT CompanyName, City, Country FROM Customers");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["CompanyName"] . '",';
    $outp .= '"City":"'   . $rs["City"]        . '",';
    $outp .= '"Country":"'. $rs["Country"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
*/

/* check connection */
/*
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
*/

/* check if server is alive */
/*
if ($mysqli->ping()) {
    printf ("Our connection is ok!\n");
} else {
    printf ("Error: %s\n", $mysqli->error);
}
*/

/* close connection */
//$mysqli->close();

/*
if($conn) {
    $result = $conn->query("SELECT 1 + 1 AS solution");

    $outp ='{"records":['.$result.']}';
    $conn->close();
}
else{
    echo "<p>Unable to connect to database</p>";
}
echo($outp);
*/
?>