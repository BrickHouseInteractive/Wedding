angular.module('wedding').controller('WeddingCtrl', ['$scope','$timeout','$rootScope','$http','$routeParams','Guests', function($scope, $timeout, $rootScope, $http, $routeParams, Guests){

	//Frame height
	// var setFrameHeight = function(){
	// 	var windowHeight = window.innerHeight;
	// 	//if(window.innerWidth > 800){
	// 		 $(".banner").css({minHeight: windowHeight});
	// 	//}
	// }
	// window.addEventListener("resize", setFrameHeight);

	//Intro Animation
	var siteTimeout = function(){
		$scope.showGuest = true;
		//$timeout(setFrameHeight);
		$timeout(function(){
			$scope.showGuest = false;
			$scope.showSite = true;
			//$timeout(setFrameHeight);
		},3000)
	}

	//Get Guest Info
	if($routeParams.id){
		Guests.get($routeParams.id,
			function(data){
				console.log(data);
				$scope.guest = data;
				siteTimeout()
			}, 
			function(data){
				console.logError("Failed to get guest");
				siteTimeout();
			}
		);
	}else{
		siteTimeout();
	}

	//RSVP
	$scope.changeRSVP = function(){
		$scope.formSubmitted = true;
		Guests.rsvp($scope.guest.id, $scope.guest.rsvp,
			function(data){
				console.log("Success!");
			},
			function(data){
				console.log("Failure");
			}
		)
	}

	//Form Submit
	/*$scope.formData = {};
	$scope.contactStatus = null;

	$timeout(function(){
		$scope.formData.hidden = "human";
	},3000)

	$scope.submitForm = function(data) {
	  if(data !== true || $scope.formData.hidden != "human"){
	  	$scope.errorMessage = "Whoops! Looks like some fields aren't filled out properly.";
	  	$scope.contactStatus = "error";
	  	return;
	  }
	  $scope.contactStatus = "loading";
	  $scope.errorMessage = "An error occurred while attempting to send your message."
	  $http({
			method  : 'POST',
			url     : '_contact.php',
			data    : $.param($scope.formData),  
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  	
		})
	  .success(function(data, status, headers, config) {
	  	
	  	if(data == 1){
	  		console.log("success");
			$scope.contactStatus = "success"
			$scope.contactForm.$setPristine();
	  		$scope.formData = {};
			$timeout(function(){
				$scope.contactStatus = null;
			},2000)
	  	}else{
	  		console.log("error:", data, status);
	  		$timeout(function(){
		  		$scope.contactStatus = "error"
		  	},500)
	  	}
	  })
	  .error(function(data, status, headers, config){
	  	console.log("error:", data, status);
	  	$timeout(function(){
	  		$scope.contactStatus = "error"
	  	},500)
	  })
	};*/

}])