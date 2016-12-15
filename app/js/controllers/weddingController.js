angular.module('wedding').controller('WeddingCtrl', ['$scope','$timeout','$rootScope','$http','$routeParams','Guests', function($scope, $timeout, $rootScope, $http, $routeParams, Guests){

	$scope.showHeader = false;
	$scope.localInfo = {};
	$scope.timeline = [];


	/* Header */
	function checkHeader(){
		if($(window).scrollTop() > 10){
			$scope.showHeader = true;
		}else{
			$scope.showHeader = false;
		}
	}

	$(window).scroll(checkHeader);
	checkHeader();

	/* Local Info */
	$http.get("data/local-info.json").then(function(response){
		$scope.localInfo = response.data;
	},function(data){
		//error
	})

	/* Timeline */
	$http.get("data/timeline.json").then(function(response){
		$scope.timeline = response.data;
	},function(data){
		//error
	})

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