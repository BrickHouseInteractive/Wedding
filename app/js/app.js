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