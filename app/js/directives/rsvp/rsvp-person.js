angular.module('wedding').
directive('rsvpPerson', ['$timeout', function($timeout){
	// Runs during compile
	return {
		scope: {
            person: '=',
		    index: '=',
            remove: '&'
        },
		templateUrl: 'js/directives/rsvp/rsvp-person.html',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
            $scope.removeGuest = function(index){
                $scope.remove()(index);
            }
		}
	};
}]);