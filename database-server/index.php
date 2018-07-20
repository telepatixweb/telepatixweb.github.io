<?php
header('Access-Control-Allow-Origin: *'); 
/*
$servername = "localhost";
$username = "gerae912_tlpxweb";
$password = "TLPxKeY#";
$dbname = "gerae912_telepatix_web";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
*/

//echo "Connected successfully";

$myfile = fopen("serverDataBaseText.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("serverDataBaseText.txt"));
fclose($myfile);

/*
$sql = "SELECT wordindexed,word FROM words";
$result = $conn->query($sql);

if($result->num_rows > 0){
	
	while($row = $result->fetch_assoc()) {
		echo $row["wordindexed"]." ".$row["word"]." ";
	}
	
} else {
    echo "0 results";
}
*/

//$conn->close();

?>