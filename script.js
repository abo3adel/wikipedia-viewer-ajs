var wikiApp = angular.module('wikiApp', ['ngAnimate', 'ngSanitize']);
    
    wikiApp.controller('wikiCtrl', ['$scope', '$http', function($scope, $http){

      // search fun
      $scope.wikiS = function(txt){

        // hide temp
        $scope.showD = $scope.showErr = false;
        // show loader
        $scope.loader = true;

        // wiki url
        var link = 'http://es.wikipedia.org/w/api.php?list=search&utf8=1&srsearch=' + txt +'&rawcontinue=true&action=query&format=json&callback=JSON_CALLBACK';

        // get wiki data
        $http.jsonp(link).then(function(res){
          // hide loader
          $scope.loader = false;

          $scope.arr = res;

          // check if no data
          if(!res.data.query.search.length){
            $scope.err = "Empty try another keyword";
            $scope.showErr = true;
          }

          // check for satues
          if(res.status == 200){
            // search data
            $scope.arr = res.data.query.search;
            // show search template
            $scope.showD = true;
          }
          else{
            // show error
            $scope.err = res;
            $scope.showErr = true;
          }
          
        }, function(err){
          // hide loader
          $scope.loader = false;

          // show error
          $scope.err = err;
          $scope.showErr = true;
        });
      };
      
      // replace spaces with _ in wiki url
      $scope.slug = function(txt){
        return txt.replace(/(\s+)/g, '_')
      };
    }]);