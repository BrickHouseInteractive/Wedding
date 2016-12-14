angular.module("wedding").
service('ImageLoader', function(){

	console.log("Loading...");
	var images = ['img/sarah-erik-text.png','img/swiss-bg.svg'];
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
