angular.module('wedding').
directive('rsvpModal', ['$timeout', '$http', function($timeout, $http){
	// Runs during compile
	return {
		scope: {
            visible: '='
        },
		templateUrl: 'js/directives/rsvp/rsvp.html',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {

			function RsvpInfo(email, attending, guests, song) {
				this.email = email,
				this.attending = attending;
				this.guests = guests ? JSON.parse(guests) : [];
				this.numberGuests = 0;
				this.song = song;
			};

			function RsvpPerson(name, attending, mealChoice) {
				this.name = name;
				this.meal = mealChoice;
			}

			$scope.rsvpInfo = new RsvpInfo("", null, "[]", "");
			$scope.rsvpCode = "";
			$scope.rsvpState = 'entry';


			$scope.goToState = function(state){
				$scope.rsvpState = state;
			}

			$scope.closeModal = function(){
				$scope.visible = false;
				$scope.rsvpState = 'entry';
				$scope.rsvpInfo = new RsvpInfo("", null, "[]", "");
			}

			$scope.addGuest = function(){
				$scope.rsvpInfo.guests.push(new RsvpPerson("",null));
			}

			$scope.removeGuest = function(index){
				console.log(index);
				$scope.rsvpInfo.guests.splice(index-1,1)
			}

			$scope.sendRsvp = function(){
				postRsvp();
			}

			function postRsvp(){
				$scope.goToState('loading');
				$scope.rsvpInfo.numberGuests = $scope.rsvpInfo.guests.length;
				$scope.rsvpInfo.guests = JSON.stringify($scope.rsvpInfo.guests);
				$http.post('_admin/_rsvp.php/'+$scope.rsvpInfo.email.toLowerCase(), $scope.rsvpInfo)
				.then(function(response){
					$scope.rsvpInfo.attending == 'yes' ? $scope.goToState('attend') : $scope.goToState('decline');
				},
				function(reponse){
					$scope.goToState('error');
				})
			}
			
			/*function GetRsvp(){
				$http.get('/_admin/_rsvp.php/'+$scope.rsvpCode.toLowerCase())
				.then(function(response){
					$scope.rsvpInfo = new RsvpInfo(
						response.data.email,
						response.data.attending,
						response.data.guests,
						response.data.song
					)
					$scope.rsvpState = 'form';
				},
				function(response){
					console.log("Could not find attendee");
				})
			}*/

		}
	};
}]);