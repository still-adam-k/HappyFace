

appControllers.controller('ListController', ['$scope','$http', function($scope, $http) {

	var createEvent = function(eventType, name, date, reason) {
		return {
			EventType: eventType,
			Name: name,
			OccurDate: date,
			Reason: reason,
		}
	};

	var extractEventsFromData = function(data) {

      var entries = data.entries;
		$scope.events = [];

      for (var i = 0; i <entries.length ; i++) {
      	var e = entries[i];
      	var strippedData = e.data.replace("/\r?\n|\r/g","");
      	var objectData = JSON.parse(strippedData);


      	var newEvent = createEvent(e.eventType,objectData.Name, e.updated.substring(0,10) ,objectData.Reason );
      	$scope.events.push(newEvent);
      }
	}

  $http.get("http://localhost:2113/streams/moods?embed=tryHarder")
  .success(function(data, status) {
      $scope.status = status;

      var serializedData = angular.toJson(data,true);
      //var strippedData = serializedData.replace("/\r?\n|\r/g","");
      var strippedData = serializedData.replace(/(\\r\\n|\\n|\\r|)/gm,"");
      var furtherStrippedData = strippedData.replace(/(  \\\"| \\\"|\\\")/gm,"\"")

      console.log(strippedData);
      console.log("---------------------------------");
      console.log(furtherStrippedData);

      //var goodData = JSON.parse(strippedData.replace(/(\\\")/gm,"\""));

      extractEventsFromData(data);
    })
  .error(function(data, status) {
      $scope.status = status;
     
    });

  }]);

