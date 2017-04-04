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
$table = "rsvp";

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
      //$sql = "select * from $table WHERE email='$key'";
      $sql = "CALL create_rsvp('$key')";
      break;
    }
  case 'PUT':
    $sql = "update $table set $set where id='$key'";
    break;
  case 'POST':
    $sql = ""; break; //"insert into $table set id=uuid(),$set"; break;
  case 'DELETE':
    $sql = "delete $table where id='$key'";
    break;
}
 
// excecute SQL statement
$result = mysqli_query($link,$sql);

// die if SQL statement failed
if (!$result || mysqli_num_rows($result) == 0 ) {
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

function sendMail($id, $email){
    $message = file_get_contents('phpmailer/save-date.html'); 
    $messageFinal = str_replace('%id%', $id, $message);
    //Create a new PHPMailer instance
    $mail = new PHPMailer;
    //Tell PHPMailer to use SMTP
    $mail->isSMTP();
    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 2;
    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';
    //Set the hostname of the mail server
    $mail->Host = "ssl://smtp.gmail.com";
    //Set the SMTP port number - likely to be 25, 465 or 587
    $mail->Port = 465;
    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;
    //Username to use for SMTP authentication
    $mail->Username = "wedding@sarahanderik.ch";
    //Password to use for SMTP authentication
    $mail->Password = "Wiseguy@948";
    //Set who the message is to be sent from
    $mail->setFrom('wedding@sarahanderik.ch', 'Sarah and Erik');
    //Set who the message is to be sent to
    foreach(explode(",",$email) as $recipient){
        $mail->addAddress($recipient);
    }
    //Set the subject line
    $mail->Subject = 'You are invited to the wedding of Sarah Kemp and Erik Sundberg';
    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    $mail->msgHTML($messageFinal);
    //Replace the plain text body with one created manually
    $mail->AltBody = 'If you are having trouble viewing this email, please visit http://sarahanderik.ch/#/save/$id to view your Save the Date.';

    //send the message, check for errors
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Email sent to ".$email."<br/>";
    }
}
?>