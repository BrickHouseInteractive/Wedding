<?php
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];

if(array_key_exists('PATH_INFO', $_SERVER) === true){
  $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
  $key = $request[0];
}else{
  $key = '';
}

$input = json_decode(file_get_contents('php://input'),true) OR $input = [];
$table = "guests";



// // connect to the mysql database
//$link = mysqli_connect('localhost:8889', 'root', 'root', 'wedding');
$link = mysqli_connect('72.52.231.174', 'weddingmanager', 'Gm;HgC9ES1GJ7I%2p?', 'wedding');
mysqli_set_charset($link,'utf8');

// // retrieve the table and key from the path
 
// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($link) {
   if ($value===null) return null;
   return mysqli_real_escape_string($link,(string)$value);
},array_values($input));
 
// // build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}

// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    if($key){
      $sql = "select * from $table WHERE id='$key'"; break;
    }else{
      $sql = "select * from $table"; break;
    }
  case 'PUT':
    $sql = "update $table set $set where id='$key'"; break;
  case 'POST':
    $sql = ""; break; //"insert into $table set id=uuid(),$set"; break;
  case 'DELETE':
    $sql = "delete $table where id='$key'"; break;
}
 
// excecute SQL statement
$result = mysqli_query($link,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error());
}else if($result && $method == 'GET'){
  mysqli_query($link, "update $table set visited=visited+1 where id='$key'");
}
 
// print results, insert id or affected row count
if ($method == 'GET') {
  if (!$key) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key) echo ']';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}
 
// close mysql connection
mysqli_close($link);
?>