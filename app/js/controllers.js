'use strict';

/* Controllers */

appControllers.controller('FaceController', ['$scope','$http', function($scope, $http) {

var validateRequiredDataPresent = function(){
	var message = "";
	if (undefined == $scope.name)
		message += "You have not entered your name\n";
	
	if (message != ""){
		alert(message);
		return false;
	}
	return true;
}

  var MoodModel = function(eventName, associatedMood) {
  	return {
  		EventName: eventName,
  		MoodName: associatedMood
  	};
  }


  $scope.teamMembers = ["Phil", "Syed", "James", "Ravi", "Kuldip", "Adam"];
  $scope.moods = [
  	MoodModel("Feels Happy", "Happy"),
  	MoodModel("Just Meh", "Meh"),
  	MoodModel("Feels Sad", "Sad")
  	];


  var send = function(mood) {

  	if (!validateRequiredDataPresent())
  		return false;

  	var postingEvent = [
  		{
  			EventId: generateUUID(),
  			EventType:mood.EventName,
  			Data:{
  				Name: $scope.name,
  				Reason: $scope.whatHappened
  			},
  			Metadata:""
		}];

	var serialized = angular.toJson(postingEvent,false);

  	$http.post("http://localhost:2113/streams/moods", postingEvent)
	.success(function() {
		$scope.whatHappened = "";
	})
	.error(function() {
		alert("Something wrong!");
	}); 
  };

//$scope.name = "Me";
//$scope.whatHappened = "nothing";
//$scope.mood = "";

$scope.IFeel = function(myMood) {
	send(myMood);
};

$scope.MyNameIs = function(name) {
	$scope.name = name;
};


function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

  }]);
