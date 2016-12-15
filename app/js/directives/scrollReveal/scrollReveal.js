angular.module('wedding').
directive('scrollReveal', ['$timeout', function($timeout){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			delay: "@"
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		//template: '<div class="scroll-reveal" ng-class="{revealed:reveal}" ng-transclude></div>',
		// templateUrl: '',
		//replace: true,
		//transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.reveal = false;
			$scope.delay = $scope.delay || 100;

			iElm.addClass("scroll-reveal");

			var checkReveal = function(){
				if($scope.reveal === true) return;
		    	if(iElm.offset().top - window.innerHeight+100 <= $(window).scrollTop()){
		    		$timeout(function(){
		    			iElm.addClass("revealed");
		    		}, $scope.delay);
		    	};
			};

			$(window).scroll(checkReveal);
			checkReveal();
		}
	};
}]);