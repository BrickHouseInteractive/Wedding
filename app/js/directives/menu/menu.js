angular.module('wedding').
directive('menu', ['$timeout','$location', '$anchorScroll', function($timeout, $location, $anchorScroll){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: true,
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		//template: '',
		templateUrl: 'js/directives/menu/menu.html',
		replace: true,
		//transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.reveal = false;
			iElm.addClass("scroll-reveal");

            $scope.scrollTo = function(id){
                $("html, body").animate(
                    { scrollTop: $("#"+id).offset().top-50 },
                    1000,
                    'swing'
                );
            }

			var checkReveal = function(){
				if($scope.reveal === true) return;
		    	if(iElm.offset().top - window.innerHeight+100 <= $(window).scrollTop()){
		    		$timeout(function(){
		    			iElm.addClass("revealed");
		    		},100);
		    	};
			};

			$(window).scroll(checkReveal);
			checkReveal();
		}
	};
}]);