<!DOCTYPE html>
<html>
  <head>
    <title>Sarah &amp; Erik</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Josefin+Slab:400,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
    <style>
    	body{
    		padding:1em 0;
    	}
		.email-preview{
			width:100%;
			height:400px;
			border:1px #ccc solid;
			padding:1em;
		}
	</style>
  </head>
  <body>
	  <div class="container">
	  	<h1>Guest Emailer</h1>
	  	<form action="_mailer.php" method="post">
	  	<table class="table">	
	  		<tr>
	  			<th>Id</th>
	  			<th>Name</th>
	  			<th>Full Name</th>
	  			<th>Adults</th>
	  			<th>Children</th>
	  			<th>Email</th>
	  			<th>Visited</th>
	  			<th>RSVP</th>
				<th>Predictions</th>
	  			<th>Send Email</th>
	  		</tr>
	  		<?php
	  			$response = file_get_contents('http://localhost:8888/_admin/_guests.php');
				$response = json_decode($response,true);
				$totalPossible = 0;
				$totalPredicted = 0;

				foreach ($response as $guest){
					echo "<tr>".
					"<td>".$guest["id"]."</td>".
					"<td>".$guest["name"]."</td>".
					"<td>".$guest["fullname"]."</td>".
					"<td>".$guest["adults"]."</td>".
					"<td>".$guest["children"]."</td>".
					"<td>".$guest["email"]."</td>".
					"<td>".$guest["visited"]."</td>".
					"<td>".$guest["rsvp"]."</td>".
					"<td>".$guest["prediction"]."</td>".
					"<td><input name='".$guest["id"]."'' type='checkbox' value='".$guest["email"]."'/></td>".
					"</tr>";
					if($guest["rsvp"] == 1 OR $guest["rsvp"] == 2){
						$totalPossible += 1/$guest["rsvp"]*($guest["adults"] + $guest["children"]);
					}
					if($guest["prediction"] == 1 OR $guest["prediction"] == 2){
						$totalPredicted += 1/$guest["prediction"]*($guest["adults"] + $guest["children"]);
					}
				}
	  		?>
	  		<tr>
	  			<th colspan="7">Total Possible</th>
	  			<td><?php echo $totalPossible ?></td>

	  			<td><?php echo $totalPredicted ?></td>
	  			<td></td>
	  		</tr>
			  
	  	</table>
	  	<!--div class="row>">
	  		<div class="col-xs-6">
	  			<textarea class="email-preview" id="email" name="body" placeholder="Write html email here" onchange="setPreview()"></textarea>
	  		</div>
	  		<div class="col-xs-6">
	  			<div class="email-preview" id="preview"></div>
	  		</div>
	  	</div-->
	  	<input type="submit" class="btn" value="Send Email"/>
	  	</form>
	 </div>
	 <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	 <script type="text/javascript">
	 	function setPreview(){
	 		console.log($("#email").val());
	 		$("#preview").html($("#email").val());
	 	}
	 </script>
</body>
</html>