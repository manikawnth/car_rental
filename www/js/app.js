// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('carrentalApp', ['ionic', 'location'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: "/home",
        templateUrl: 'templates/home.html'
    })

    $stateProvider.state('locsearch', {
        url: "/locsearch",
        templateUrl: 'templates/locsearch.html'
    })

    $urlRouterProvider.otherwise('/home')

}])

.factory('resdata', function() {
    var resdata = {
        outloc: ""
    }

    return resdata;

})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('HomeCtrl', ['$scope', 'resdata', function($scope, resdata) {
    resdata = {};
    $scope.switch_to_locsearch = function() {
        console.log("Switch to location search page");
    }
}])

.controller('locsearchCtrl', ['$scope', '$http', '$filter', 'resdata', 'locdata', function($scope, $http, $filter, resdata, locdata) {
    console.log("Entered location search")
    console.log(resdata);
    resdata.outloc = $scope.outloc;
    $scope.show = false;

    $scope.locs = [];
    // for(i=0;i<locdata.length;i++){
    //   var doc = {};
    //   doc.id = i;
    //   doc.name = locdata[i];
    //   $scope.locs.push(doc);
    // }
    console.log($scope.locs);

    $scope.$watch('outloc', function(newval, oldval) {
        $scope.locs = [];
        if (newval != undefined && newval.length >= 3) {
            console.log(newval);
            var re = new RegExp(newval, 'i');
            // $scope.locs = $filter('filter')(locdata,$scope.outloc);
            locdata.forEach(function(str) {
            
                var match_str = str.match(re)
                if (match_str != null) {
                    $scope.locs.push(str)
                }

            })
            $scope.show = true;
        } else {
            $scope.show = false;

        }
    })
}])
