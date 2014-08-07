'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shareMood', {templateUrl: 'partials/share.html', controller: 'FaceController'});
  $routeProvider.when('/feelingsList', {templateUrl: 'partials/moodList.html', controller: 'ListController'});
  $routeProvider.otherwise({redirectTo: '/shareMood'});
}]);


var appControllers = angular.module('myApp.controllers', []);