angular.module('wedding', ['ngSanitize','ngRoute'])
.config(['$routeProvider',
  	function($routeProvider) {
		$routeProvider.
		when('/', {
	        templateUrl: 'views/wedding.html',
	        controller: 'WeddingCtrl'
	      }).
		  when('/save', {
	        templateUrl: 'views/home.html',
	        controller: 'WeddingCtrl'
	      }).
	      when('/save/:id', {
	        templateUrl: 'views/home.html',
	        controller: 'WeddingCtrl'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
	}
])
.run(function(){
	console.log("Loading...");
	var images = ['img/sarah-erik-text.png','img/swiss-bg.jpg'];
	var totalImagesLoaded = 0;
	var assetsLoaded = false;

	var imageLoaded = function(){
		totalImagesLoaded++;
		if(totalImagesLoaded >= _.size(images)){
			console.log("...Assets Loaded");
		}
	}
	_.forEach(images, function(image) {
		var img = new Image();
		img.onLoad = imageLoaded();
		img.src = image;
	});
})