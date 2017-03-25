'use strict';

/**
 * @ngdoc function
 * @name jsonparserApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsonparserApp
 */
angular.module('jsonparserApp', [
    'ngSanitize', 
    'angular-bind-html-compile'
  ])
  .controller('MainCtrl', function ($scope) {
    //Sample
    $scope.raw = '{"13":"nigga", "24":24, "kappa":[23,24,25], "key": {"name":"no","age":15,"im":["s1","s2","s3"],"key2":true, "key3":null},"arrofobj": [{"a": 2, "b": "3"},{"a": 2, "b": "3"},{"a": 2, "b": "3"}]}';
    //Options
    $scope.vertical = true;
    $scope.showTypes = true;
    $scope.showColor = true;
    $scope.showIndex = true;
    //Content
    $scope.prettified = "";
    var prettifiedMini = "";
    $scope.prettify = function(){
      console.log($scope.raw);
      try {
        var obj = JSON.parse($scope.raw);
        var pretty = JSON.stringify(obj, null, 2);
        $scope.prettified = lib.getPrettyJson(obj, 4, true);
        prettifiedMini = lib.getPrettyJson(obj, 0, false);
      } catch (err) {
        $scope.prettified = err.message;
        prettifiedMini = err.message;
      }
    }
    //Set class css
    $scope.options = function(cls){
      cls += $scope.showTypes ? " show-type" : "";
      cls += $scope.showColor ? " show-color" : "";
      cls += $scope.showIndex ? " show-index" : "";
      return cls;
    }
    //Change layout
    $scope.boxHeight = 90;
    $scope.changeLayout = function(){
      $scope.vertical = !$scope.vertical;
      $scope.boxHeight = $scope.boxHeight == 90 ? 44: 90;
    }
    //Change mini/full
    $scope.toggleMini = function(){
      var temp = $scope.prettified;
      $scope.prettified = prettifiedMini;
      prettifiedMini = temp;
    }
    //For debugging
    $scope.prettify();
  });

