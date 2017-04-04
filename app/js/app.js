angular.module('wedding', ['ngSanitize','ngRoute'])
.config(['$routeProvider',
  	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/wedding.html',
				controller: 'WeddingCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
])