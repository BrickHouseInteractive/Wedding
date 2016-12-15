angular.module('wedding').service('Guests', ['$http', function($http){
	return{
		get: function(id, successCB, errorCB){
			$http.get('_guests.php/'+id).then(
				function(response){
					successCB(response.data);
				}, 
				function(){
					console.log("Failed to get guest");
					errorCB(response,data);
				}
			);
		},
		rsvp: function(id, rsvp, successCB, errorCB){
			$http.put(
				'_guests.php/'+id, 
				{rsvp:rsvp}, 
				{ 'Content-Type': 'application/json' } 
			).then(
				function(response){
					successCB(response.data);
				}, 
				function(){
					console.log("Failed to get guest");
					errorCB(response.data);
				}
			);
		}
	}
}])
