var form = angular.module("Sign_up_form", []);


form.controller('Formcontoroller', function ($scope, $http) {
    $scope.name = "Ali";

    // if ($scope.user.password === $scope.user.R_password){
    //   console.log("Boz");
    // }


    // $http.get("https://api.countrylayer.com/v2/iran")
    // .then(function(res){
    //   console.log(res);    
    // })
});
form.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope:
        {
            confirmPassword: "=compareTo"
        },
        link: function (scope, element, attributes, modelVal) {
            modelVal.$validators.compareTo = function (val) {
                return val == scope.confirmPassword;
            };
            scope.$watch("confirmPassword", function () {
                modelVal.$validate();
            });
        }
    };
});

var Dashboard = angular.module("Dashboard", ["ngRoute"]);
Dashboard.controller('Dashboard', function ($scope) {

});
window.location = '#!dashboard';
Dashboard.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/dashboard',
        { templateUrl: "../../Dashboard_app.html" }
    );
    $routeProvider.when('/select_app',{templateUrl:"../../Select_app.html"})
}]);


var select_app = angular.module("select_app", []);
Dashboard.controller('select_app', function ($scope) {
    $scope.click = function(name) {
        // console.log(name);
        if ($scope[name] == 'noborder'){
            $scope[name] = 'border';
            $scope.name_learn = name;
            document.getElementById('click_model').click();
        }
      else{
          $scope[name] = "noborder";
          $scope.name_learn = ' ';

      }
      
    };
    $scope.disChoies_timetable = function(){
        // document.getElementById('flexCheckDefault').checked = false;
    //   var chekbox= document.getElementsByClassName("form-check-input");
    location.href+="?anything#selectapp";
        //location.reload();
    //     alert("boz");
    };
});








/// eay login
